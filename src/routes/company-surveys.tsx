import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../models/company.model";
import { getCompany } from "../services/companies.service";
import { getResponsesForSurvey } from "../services/responses.service";
import { getSurveysByCompany } from "../services/surveys.service";
import ChartComponent from "../components/chart/chart";
import { getPieChartOptions, PieChartSeries } from "../models/chart.model";
import { AppRoutes } from "../models/routes";
import { mapValuesToArray } from "../utils/utils";
import { Survey } from "../models/survey.model";
import ErrorComponent from "../components/error/errors";
import { appIsLoading } from "../services/loading.service";

export default function CompanySurveysComponent() {
    const navigate = useNavigate();
    let { companyId } = useParams();
    let companySurveys: Map<string, Survey> = new Map();
    const [isError, setIsError] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [company, setCompany] = useState<Company>(null);
    const errorMessage: string = 'Error loading company survey chart';

    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                const company = companyId ? await getCompany(companyId) : null;
                if (!company) throw new Error();
                setupData(company);
            } catch (e) {
                console.error(e);
                setIsError(true);
            } finally {
                appIsLoading.next(false);
            }
        }

        fetchData();
    }, []);

    const setupData = async (company: Company) => {
        try {
            companySurveys = await getSurveysByCompany(company.id);
            const responsesBySurvey: Map<string, Map<any, any>> = new Map();
            await Promise.all(Array.from(companySurveys.values()).map(async s => {
                const responses = await getResponsesForSurvey(s.id);

                mapValuesToArray(responses).forEach(r => {
                    const exists = responsesBySurvey.get(s.id);
                    if (!!exists) {
                        exists.set(r.employee_id, r.employee_id)
                    } else {
                        const employeeMap = new Map([[r.employee_id, r.employee_id]]);
                        responsesBySurvey.set(s.id, employeeMap);
                    }
                })
            }));

            setupChartData(responsesBySurvey, company);
        } catch (e) {
            console.error(e);
            setIsError(true);
        }
    };

    const setupChartData = (responsesBySurvey: Map<string, Map<string, string>>, company: Company) => {
        const surveyCounts: PieChartSeries[] = [];
        Array.from(responsesBySurvey).forEach(entries => {
            const [id, value] = entries;
            surveyCounts.push({ name: companySurveys.get(id).name, key: id, y: value.size });
        });
        const options: Highcharts.Options = addCustomOptions(getPieChartOptions('Surveys', surveyCounts));
        setCompany(company);
        setChartOptions(options);
    };

    const addCustomOptions = (options)  => {
        options.tooltip = {
            useHTML: true,
            formatter: function () {
                return `${this.series.name} has ${this.y} responses`;
            }
        };
        options.plotOptions = {
            ...options.plotOptions,
            series: {
                point: {
                    events: {
                        click: (e) => {
                        const surveyKey: string = e?.point?.key;
                        if (!surveyKey) return;

                        navigate(`/${AppRoutes.Responses}/${surveyKey}`);
                        }
                    }
                }
            }
        }

        return options;
    };

    return (
        <>
        {isError && <ErrorComponent message={errorMessage} />}

        {!isError && chartOptions &&
            <ChartComponent
                title={`${company.name} - Survey`}
                options={chartOptions}
            />
        }
        </>
    );
}