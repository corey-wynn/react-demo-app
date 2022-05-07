import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../models/company.model";
import { SurveyResponse } from "../models/survey-responses.model";
import { getCompany } from "../services/companies.service";
import { getResponsesForSurvey } from "../services/responses.service";
import { getSurveysByCompany } from "../services/surveys.service";
import Chart from "../components/chart/chart";
import { getColumnChartOptions } from "../models/chart.model";

export default function CompanySurveys() {
    let { companyId } = useParams();
    const [isError, setIsError] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<any>(null);
    const companySurveys = useRef(new Map());
    const [company, setCompany] = useState<Company>(null);

    useEffect(() => {
        const fetchData = async () => {
            const company = companyId ? await getCompany(companyId) : null;
            if (company) setupData(company);
        }

        fetchData();
    }, []);

    const setupData = async (company: Company) => {
        try {
            companySurveys.current = await getSurveysByCompany(company.id);
            const responsesBySurvey: Map<string, Map<string, SurveyResponse>> = new Map();
            await Promise.all(Array.from(companySurveys.current.values()).map(async s => {
                const responses = await getResponsesForSurvey(s.id);
                responsesBySurvey.set(s.id, responses)
            }));
            if (company) setupChartData(responsesBySurvey, company);
        } catch (e) {
            console.error(e);
            setIsError(true);
        }
    };

    const setupChartData = (responsesBySurvey: Map<string, Map<string, SurveyResponse>>, company: Company) => {
        const surveyCounts = [];
        Array.from(responsesBySurvey).forEach(entries => {
            const [id, value] = entries;
            surveyCounts.push({ name: companySurveys.current.get(id).name, data: [value.size] });
        });
        let options = getColumnChartOptions([company.name], surveyCounts, 'Responses', 'Surveys');
        options = addCustomOptions(options);
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
        options.plotOptions.series = {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        console.log('go to break down pie chart')
                    }
                }
            }
        }

        console.log('BAMF - options', options);
        return options;
    };

    return (
        <>
        {isError && <p>Error</p>}

        {!isError && chartOptions &&
            <Chart
                title={`${company.name} - Survey`}
                options={chartOptions}
            />
        }
        </>
    );
}