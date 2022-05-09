import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingComponent() {
    return (
        <>
            <div className={styles().loadingContainer}>
                <FontAwesomeIcon className={'loading-icon'} icon={'spinner'} />
            </div>
        </>
    );
}
const styles = createUseStyles({
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    loadingText: {
        fontSize: '30px'
    },
    hidden: {
        display: 'none',
    },
})