export const COLUMN_CHART_OPTIONS: Partial<Highcharts.Options> = {
    chart: {
        type: 'column',
        width: 750,
        height: 500
    },
    title: null,
    xAxis: {
        categories: []
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
    },
    series: []
}

export interface ColumnChartSeries {
    name: string;
    key: any;
    data: number[];
};

export const PIE_CHART_OPTIONS: Partial<Highcharts.Options> = {
    chart: {
        type: 'pie',
    },
    title: null,
    plotOptions: {
        pie: {
            dataLabels: {
                formatter: function (e) {
                    return this.point.name;
                }
            }
        }
    },
    series: []
}

export const getColumnChartOptions = (categories: string[], seriesData: ColumnChartSeries[], yAxisTitle: string, xAxisTitle: string) => {
    return {
        ...COLUMN_CHART_OPTIONS,
        xAxis: {
            title: {
                text: xAxisTitle
            },
            categories
        },
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
        series: seriesData
    };
}

export interface PieChartSeries {
    name: string;
    key: any;
    y: number;
};

export const getPieChartOptions = (name: string, seriesData: PieChartSeries[]) => {
    return {
        ...PIE_CHART_OPTIONS,
        series: [{
            name,
            data: seriesData
        }]
    };
}