import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/table/table";
import { TableColumn, TableConfig, TableRow } from "../components/table/table.model";
import { Company } from "../models/company.model";
import { getCompanies } from "../services/companies.service";

export default function Companies() {
    const [tableConfig, setTableConfig] = useState<TableConfig>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data: Map<string, Company> = await getCompanies();
            setupTable(data);
        }

        fetchData();
    }, []);

    const handleClick = (row: TableRow) => navigate(row.key);

    const setupTable = (companies: Map<string, Company>) => {
        const columns: TableColumn[] = [
            {
                key: 'name',
                name: 'Name',
                width: 200
            }
        ];
        const rows: TableRow[] = Array.from(companies.values())?.map((c, index) => ({
            key: c.id,
            items: [{
                colKey: columns[0].key,
                value: c.name,
                width: columns[0].width
            }],
            click: (r) => handleClick(r)
        }));
        setTableConfig({ rows, columns });
    };

    return (
        <>
            {tableConfig && <TableComponent rows={tableConfig.rows} columns={tableConfig.columns} />}
        </>
    );
}