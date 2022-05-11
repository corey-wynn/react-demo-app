import { createUseStyles } from "react-jss";

export default function ChartTitleComponent(props: { title: string}) {
    const classes = styles();
    const { title } = props;
    
    return (
        <>
            {title && <p className={classes.title}>{title}</p>}
        </>
    );
}

const styles = createUseStyles({
    title: {
        fontSize: '25px',
        fontWeight: 500,
        marginBottom: '15px'
    }
})
