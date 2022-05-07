import { Company } from "../models/company.model";
import { makeCall } from "./http.service"

export const getCompanies = (): Promise<Map<string, Company>> => {
    return makeCall('companies');
}

export const getCompany = async (id: string): Promise<Company | undefined> => {
    const companies: Map<string, Company> = await makeCall('companies');
    return companies.get(id);
}