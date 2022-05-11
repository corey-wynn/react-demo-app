import { Company } from "../models/company.model";
import { Department } from "../models/department.model";
import { Employee } from "../models/employee.model";
import { makeCall } from "./http.service"

const URL: string = 'employees';

export const getEmployees = async (): Promise<Map<string, Employee>> => {
    const companies: Map<string, Company> = await makeCall('companies');
    const departments: Map<string, Company> = await makeCall('departments');
    const employees: Map<string, Employee> = await makeCall(URL);
    Array.from(employees.values()).map(e => {
        e.company = companies.get(e.company_id) as Company;
        e.department = departments.get(e.department_id) as Department;
    });

    return employees;
}

export const getEmployee = async (id: string): Promise<Employee> => {
    const employees: Map<string, Employee> = await getEmployees();
    return employees.get(id);
}