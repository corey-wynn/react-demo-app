
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { newMessage } from "../../services/message.service";

export function MessageCountComponent() {
    const classes = styles();
    const [badgeCount, setBadgeCount] = useState<number>(1);

    newMessage.subscribe(() => setBadgeCount(badgeCount + 1));

    return (
        <div className={classes.badge}>
            <p className={classes.badgeText}>{badgeCount}</p>
        </div>
    )
}

const styles = createUseStyles({
    badge: {
        width: '20px',
        height: '20px',
        background: 'red',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',     
    },
    badgeText: {
        color: 'white',
        fontSize: '12px'
    }
});