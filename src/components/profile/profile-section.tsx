import { createUseStyles } from "react-jss";

interface ProfileSection {
    title: string;
    info: string;
}
export function ProfileSectionComponent(props: ProfileSection) {
    const classes = styles();
    const { title, info } = props;
    return (
        <div className={classes.section}>
            <p className={classes.title}>{title}</p>
            <p>{info}</p>
        </div>
    )
}

const styles = createUseStyles({
    section: {
        width: '100%',
        paddingBottom: '15px',
        marginBottom: '15px'
    },
    title: {
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: 600
    },
})