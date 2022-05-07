export const COLUMN_CHART_OPTIONS: Partial<Highcharts.Options> = {
    chart: {
        type: 'column',
        width: 750
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
        series: {}
    },
    series: []
}

export const getColumnChartOptions = (categories: string[], seriesData: {name: string, data: number[]}[], yAxisTitle: string, xAxisTitle: string) => {
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