import { createUseStyles } from "react-jss";

export default function ChartTitle(props: { title: string}) {
    const { title } = props;
    return (
        <>
            {title && <p className={styles().title}>{title}</p>}
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
