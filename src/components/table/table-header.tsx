import { createUseStyles } from "react-jss";
import { TableColumn } from "./table.model";

export default function TableHeaderComponent(props: { columns: TableColumn[] }) {
    const classes = styles();
    const { columns } = props;
    
    return (
        <div className={classes.tableHeaderContainer}>
            {columns?.map((c, index) => (
                <div key={index} style={{ width: c.width }} className={classes.columnHeader}>
                    <p>{c.name}</p>
                </div>
            ))}
        </div>
    );
}

const styles = createUseStyles({
    tableHeaderContainer: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        padding: '0 15px 15px'
    },
    columnHeader: {
        fontSize: '16px',
        textTransform: 'uppercase',
        fontWeight: 600
    }
})