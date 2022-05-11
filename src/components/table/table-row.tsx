import { TableRow, TableRowAction } from './table.model';
import { createUseStyles } from 'react-jss';
import { TableRowItemComponent  } from './table-row-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TableRowComponent(props: { row: TableRow }) {
    const classes = styles();
    const { row } = props;
    const handleRowClick = (row: TableRow): void => {
        if (!row.click) return;
        row.click(row);
    };
    const rowAction = (e, row: TableRow, rowAction: TableRowAction) => {
        e.stopPropagation();
        rowAction.action(row)
    };

    const renderRowAction = (a: TableRowAction, row: TableRow, index: number) => (
        <div key={`${row.key}-${index}-action`} onClick={(e) => rowAction(e, row, a)} className={classes.rowAction}>
            <FontAwesomeIcon color={'#2b2e33'} icon={a.icon} />
        </div>
    );

    return (
        <div onClick={() => handleRowClick(row)} className={`${classes.tableRow} ${row.click && classes.actionable}`}>
            {row.items.map((item, index) => (
                <TableRowItemComponent key={`${item.value}-${index}`} item={item} />)
            )}

            {row.actions?.length > 0 &&
                <div className={styles().rowActions}>
                    {row.actions.map((a, index) => (renderRowAction(a, row, index)))}
                </div>
            }
        </div>
    );
}

const styles = createUseStyles({
    tableRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width:'100%',
        padding: '15px',
        marginBottom: '15px',
        border: '1px solid #2b2e33',
        borderRadius: '5px',
    },
    actionable: {
        cursor: 'pointer',
        '&:hover': {
            background: '#e9e9e9'
        }
    },
    rowItem: {
        fontSize: '14px'
    },
    rowActions: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    rowAction: {
        padding: '0px 5px',
        cursor: 'pointer',
        color: '#2b2e33'
    }
})