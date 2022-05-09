import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/chart/chart";
import ErrorComponent from "../components/error/errors";
import { ColumnChartSeries, getColumnChartOptions } from "../models/chart.model";
import { Question } from "../models/question.model";
import { responseMap, SurveyResponse } from "../models/survey-responses.model";
import { Survey } from "../models/survey.model";
import { appIsLoading } from "../services/loading.service";
import { getQuestionBySurvey } from "../services/questions.service";
import { getResponsesForSurvey } from "../services/responses.service";
import { getSurvey } from "../services/surveys.service";
import { mapValuesToArray } from "../utils/utils";

export default function SurveyResponses() {
    let { surveyId } = useParams();
    const [isError, setIsError] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [survey, setSurvey] = useState<Survey>(null);
    const errorMessage: string = 'Error loading company survey response chart';

    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                const survey: Survey = await getSurvey(surveyId);
                if (!survey) throw new Error('cannot find survey');
                const responses = surveyId ? await getResponsesForSurvey(surveyId) : null;
                const questions = await getQuestionBySurvey(surveyId);
                if (responses && questions) {
                    setSurvey(survey);
                    setupData(responses, questions);
                } else {
                    throw new Error('cannot find questions or responses');
                }
            } catch (e) {
                console.error(e);
                setIsError(e);
            } finally {
                appIsLoading.next(false);
            }
        }
    
        fetchData();
    }, []);

    const setupData = async (responses: Map<string, SurveyResponse>, questions: Map<string, Question>) => {
        try {
            const scoresByQuestionMap: Map<string, Map<number, number>> = new Map();
            mapValuesToArray(responses).forEach(res => {
                const questionExists = scoresByQuestionMap.get(res.question_id);
                if (!!questionExists) {
                    const scoreExists = questionExists.get(res.score);
                    if (!!scoreExists) questionExists.set(res.score, scoreExists + 1);
                    else questionExists.set(res.score, 1);
                } else {
                    scoresByQuestionMap.set(res.question_id, new Map([[res.score, 1]]));
                }
            });

            setupChartData(questions, scoresByQuestionMap);
        } catch (e) {
            console.error(e);
            setIsError(true);
        }
    }

    const setupChartData = (questions: Map<string, Question>, scoresMap: Map<string, Map<number, number>>) => {
        const categories: string[] = mapValuesToArray(questions).map(q => q.prompt);
        const series: ColumnChartSeries[] = Array.from(responseMap.keys()).map(score => ({ name: responseMap.get(score), key: score, data: []}))
        Array.from(scoresMap.values()).forEach(map => {
            series.forEach(s => {
                const val = map.get(s.key);
                s.data.push(val);
            });
        });

        const options = getColumnChartOptions(categories, series, 'Responses', 'Questions');
        setChartOptions(options);
    };

    return (
        <>
            {isError && <ErrorComponent message={errorMessage} />}

            {!isError && chartOptions && survey &&
                <Chart
                    title={`${survey.name}`}
                    options={chartOptions}
                />
            }
        </>
    );
}