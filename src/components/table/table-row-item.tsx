import { TableRowItem } from './table.model';
import { createUseStyles } from 'react-jss';

export function TableRowItemComponent(props: { item: TableRowItem }) {
    const classes = styles();
    const { item }= props;
    return (
        <div style={{ width: item.width }} className={classes.rowItem}>
            <p>{item.value}</p>
        </div>
    );
}

const styles = createUseStyles({
    rowItem: {
        fontSize: '14px'
    }
})