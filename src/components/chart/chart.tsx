import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { createUseStyles } from 'react-jss';
import ChartTitleComponent from './chart-title';

export interface ChartProps {
    title: string;
    options: any;
}

export default function ChartComponent(props: ChartProps) {
    const classes = styles();
    const { options, title } = props;

    return (
        <div className={classes.wrapper}>
            <ChartTitleComponent title={title} />

            <div className={classes.chartContainer}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    );
}

const styles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '15px'
    },
    chartContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }
})