import { Company } from "../models/company.model";
import { Employee } from "../models/employee.model";
import { AppRoutes } from "../models/routes";
import { makeCall } from "./http.service"

export const gettUsers = async (): Promise<any> => {
    const companies: Map<string, Company> = await makeCall('companies');
    const employees: Map<string, Employee> = await makeCall(AppRoutes.Employees);
    Array.from(employees.values()).map(e => {
        e.company = companies.get(e.company_id) as Company;
    });

    return employees;
}