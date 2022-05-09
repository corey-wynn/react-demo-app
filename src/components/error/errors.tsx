import { createUseStyles } from "react-jss";

export default function ErrorComponent(props: { message: string}) {
    return (
        <>
            <div className={styles().loadingContainer}>
                <p className={styles().errorText}>{props.message ? props.message : 'Error'}</p>
            </div>
        </>
    );
}
const styles = createUseStyles({
    loadingContainer: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 999,
        background: 'white'
    },
    errorText: {
        fontSize: '30px'
    },
})