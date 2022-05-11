import { Company } from "./company.model";
import { Department } from "./department.model";

export interface Employee {
    id: string;
    department_id: string;
    company_id: string;
    manager_id: string;
    name: string;
    company: Company;
    department: Department;
}
