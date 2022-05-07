import { useEffect, useState } from "react";
import TableComponent from "../components/table/table";
import { TableColumn, TableConfig, TableRow } from "../components/table/table.model";
import { Employee } from "../models/employee.model";
import { gettUsers } from "../services/employees.service";

export default function Users() {
    const [tableConfig, setTableConfig] = useState<TableConfig>();

    useEffect(() => {
        const fetchData = async () => {
            const data: Map<string, Employee> = await gettUsers();
            setupTable(data);
        }

        fetchData();
    }, []);

    const setupTable = (users: Map<string, Employee>) => {
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

        const rows: TableRow[] = Array.from(users.values())?.map(user => {
            return {
                key: user.id,
                items: [
                    {   
                        colKey: columns[0].key,
                        value: user.name,
                        width: columns[0].width
                    },
                    {
                        colKey: columns[1].key,
                        value: user.company.name,
                        width: columns[1].width
                    },
                ]
            }
        });

        setTableConfig({ rows, columns });
    };

    return (
        <>
            {tableConfig && <TableComponent rows={tableConfig.rows} columns={tableConfig.columns} />}
        </>
    );
}