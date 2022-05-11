import { IconName } from '@fortawesome/fontawesome-common-types';
export interface TableConfig {
    columns: TableColumn[];
    rows: TableRow[];
}

export interface TableColumn {
    key: string;
    name: string;
    width: number;
}

export interface TableRow {
    key: string;
    items: TableRowItem[];
    click?: (row: TableRow) => void;
    actions?: TableRowAction[];
}

export interface TableRowItem {
    colKey: string;
    value: string;
    width: number;
}

export interface TableRowAction {
    icon: IconName;
    action: (row: TableRow) => void;
}


