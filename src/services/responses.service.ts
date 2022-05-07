import { Question } from "../models/question.model";
import { SurveyResponse } from "../models/survey-responses.model";
import { makeCall } from "./http.service"
import { getQuestionBySurvey } from "./questions.service";

const URL: string = 'survey-responses';

export const getResponses = (): Promise<Map<string, SurveyResponse>> => {
    return makeCall(URL);
}

export const getResponsesForSurvey = async (surveyId: string): Promise<Map<string, SurveyResponse>> => {
    const questions: Map<string, Question> = await getQuestionBySurvey(surveyId);
    const allResponses: Map<string, SurveyResponse> = await getResponses();
    const responses: Map<string, SurveyResponse> = Array.from(allResponses.values())
        .reduce((map, value) => {
            if (questions.get(value.question_id)) map.set(value.id, value);
            return map;
        }, new Map());
    return responses;
}