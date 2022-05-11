import { createUseStyles } from "react-jss";
import TableHeaderComponent from "./table-header";
import { TableRowComponent } from "./table-row";
import { TableConfig } from "./table.model";

export default function TableComponent(props: TableConfig) {
    const classes = styles();
    return (
        <div className={classes.tableContainer}>
            <div className={classes.tableHeaderContainer}>
                <TableHeaderComponent columns={props.columns} />
            </div>
            <div className={classes.tableRowsContainer}>
                {props.rows.map(r => (<TableRowComponent key={r.key} row={r} />))}
            </div>
        </div>
    );
}

const styles = createUseStyles({
    tableContainer: {
        width:'100%',
        height: '100%',
        overflow: 'auto'
    },
    tableHeaderContainer: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        position: 'sticky',
        top: 0,
        background: 'white'
    },
    tableRowsContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '1',
        overflow: 'scroll'
    },
})