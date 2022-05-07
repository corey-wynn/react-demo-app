import { createUseStyles } from "react-jss";
import InputComponent from "../components/input/input";

export default function LoginComponent() {
    return (
        <div className={styles().screenContainer}>
            <div className={styles().title}>
                <p>Login</p>
            </div>

            <div className={styles().input}>
                <InputComponent />
            </div>
            <div className={styles().input}>
                <InputComponent />
            </div>
        </div>
    );
}

const styles = createUseStyles({
    screenContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height: '100%',
        overflow: 'scroll'
    },
    title: {
        fontSize: '26px',
        marginBottom: '15px'
    },
    input: {
        marginBottom: '15px'
    }
})