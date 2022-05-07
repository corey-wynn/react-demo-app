import { Question } from "../models/question.model";
import { makeCall } from "./http.service"

const URL: string = 'survey-questions';

export const getQuestions = (): Promise<Map<string, Question>> => {
    return makeCall(URL);
}

export const getQuestionBySurvey = async (surveyId: string): Promise<Map<string, Question>> => {
    const questions: Map<string, Question> = await getQuestions();
    const surveyQuestions: Map<string, Question> = Array.from(questions.values())
        .reduce((map, value) => {
            if (value.survey_id === surveyId) map.set(value.id, value);
            return map;
        }, new Map());
    return surveyQuestions;
}