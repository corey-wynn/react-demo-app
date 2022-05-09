import { TableRow } from "./table.model";
import {createUseStyles} from 'react-jss'

export function TableRowComponent(props: { row: TableRow }) {
    const { row } = props;
    const classes: string =  `${styles().tableRow} ${row.click && styles().actionable}`
    const handleClick = (): void => {
        if (!row.click) return;
        row.click(row);
    };

    return (
        <div onClick={handleClick} className={classes}>
            {row.items.map((item, index) => (
                <div key={`${item.value}-${index}`} style={{ width: item.width }} className={styles().rowItem}>{item.value}</div>
            ))}
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
        border: '1px solid black',
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
    }
})