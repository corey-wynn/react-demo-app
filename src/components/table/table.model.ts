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
}

export interface TableRowItem {
    colKey: string;
    value: string;
    width: number;
}


