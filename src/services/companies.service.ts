import { Company } from "../models/company.model";
import { makeCall } from "./http.service"

const URL: string = 'companies';

export const getCompanies = (): Promise<Map<string, Company>> => {
    return makeCall(URL);
}

export const getCompany = async (id: string): Promise<Company | undefined> => {
    const companies: Map<string, Company> = await getCompanies();
    return companies.get(id);
}