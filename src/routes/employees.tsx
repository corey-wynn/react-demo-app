import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/error/errors";
import TableComponent from "../components/table/table";
import { TableColumn, TableConfig, TableRow } from "../components/table/table.model";
import { Employee } from "../models/employee.model";
import { AppRoutes } from "../models/routes";
import { getEmployees } from "../services/employees.service";
import { appIsLoading } from "../services/loading.service";
import { newMessage } from "../services/message.service";

export default function EmployeesComponent() {
    const navigate = useNavigate();
    const [isError, setIsError] = useState<boolean>(false);
    const [tableConfig, setTableConfig] = useState<TableConfig>();
    const errorMessage: string = 'Error loading employees';

    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                const data: Map<string, Employee> = await getEmployees();
                setupTable(data);
            } catch (e) {
                console.error(e);
                setIsError(true);
            } finally {
                appIsLoading.next(false);
            }
        }

        fetchData();
    }, []);

    const setupTable = (employees: Map<string, Employee>) => {
        const columns: TableColumn[] = [
            {
                key: 'name',
                name: 'Name',
                width: 200
            },
            {
                key: 'company',
                name: 'Company',
                width: 200
            }
        ];

        const rows: TableRow[] = Array.from(employees.values())?.map(employee => {
            return {
                key: employee.id,
                click: (r: TableRow) => navigate(`/${AppRoutes.Employee}/${r.key}`),
                actions: [{
                    icon: 'message',
                    action: () => newMessage.next()
                }],
                items: [
                    {   
                        colKey: columns[0].key,
                        value: employee.name,
                        width: columns[0].width
                    },
                    {
                        colKey: columns[1].key,
                        value: employee.company.name,
                        width: columns[1].width
                    },
                ]
            }
        });

        setTableConfig({ rows, columns });
    };

    return (
        <>
            {isError && <ErrorComponent message={errorMessage} />}
            {!isError && tableConfig && <TableComponent rows={tableConfig.rows} columns={tableConfig.columns} />}
        </>
    );
}