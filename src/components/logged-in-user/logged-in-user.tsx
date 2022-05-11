import AvatarComponent, { AvatarProps } from "../avatar/avatar";
import { createUseStyles } from "react-jss";
import { MessageCountComponent } from "../message-count/message-count";

export function LoggedInUserComponent() {
    const classes = styles();
    const avatar: AvatarProps = {
        size: 45,
        altText: 'Corey Wynn',
        image: 'https://i.pravatar.cc/45'
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.avatarWrapper}>
                <div className={classes.badge}>
                    <MessageCountComponent />
                </div>
                <AvatarComponent {...avatar} />
            </div>
        </div>
    )
}

const styles = createUseStyles({
    wrapper: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px 15px',
        marginBottom: '15px',
        borderBottom: '1px solid #e9e9e9'
    },
    avatarWrapper: {
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        top: '-7px',
        right: '-7px'
    }
});