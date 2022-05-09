import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/error/errors";
import TableComponent from "../components/table/table";
import { TableColumn, TableConfig, TableRow } from "../components/table/table.model";
import { Company } from "../models/company.model";
import { getCompanies } from "../services/companies.service";
import { appIsLoading } from "../services/loading.service";

export default function Companies() {
    const [isError, setIsError] = useState<boolean>(false);
    const [tableConfig, setTableConfig] = useState<TableConfig>();
    const navigate = useNavigate();
    const errorMessage: string = 'Error loading companies';

    useEffect(() => {
        const fetchData = async () => {
            try {
                appIsLoading.next(true);
                const companies: Map<string, Company> = await getCompanies();
                if (!companies) throw new Error('cannot find companies');
                setupTable(companies);
            } catch (e) {
                console.error(e);
                setIsError(true);
            } finally {
                appIsLoading.next(false);
            }
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
            {isError && <ErrorComponent message={errorMessage} />}
            {!isError && tableConfig && <TableComponent rows={tableConfig.rows} columns={tableConfig.columns} />}
        </>
    );
}