import { Survey } from "../models/survey.model";
import { makeCall } from "./http.service"

const URL: string = 'surveys';

export const getSurveys = (): Promise<Map<string, Survey>> => {
    return makeCall(URL);
}

export const getSurvey = async (id: string): Promise<Survey> => {
    const surveys: Map<string, Survey> = await makeCall(URL);
    return surveys.get(id);
}

export const getSurveysByCompany = async (companyId: string): Promise<Map<string, Survey>> => {
    const surveys: Map<string, Survey> = await getSurveys();
    const companySurveys: Map<string, Survey> = Array.from(surveys.values())
        .reduce((map, value) => {
            if (value.company_id === companyId) map.set(value.id, value);
            return map;
        }, new Map());
    return companySurveys;
}
