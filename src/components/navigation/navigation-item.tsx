import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
import { AppRouteToIcon } from "../../models/routes";
import { NavigationItem } from "./navigation.model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavigationItemComponent(props: NavigationItem) {
    const classes = styles();
    const iconName = AppRouteToIcon[props.route];
    return (
        <NavLink
            className={({ isActive }) => (`${classes.navItem} ${isActive && classes.active}`)}
            to={`/${props.route}`}
        >   
            {AppRouteToIcon[props.route] 
                && <FontAwesomeIcon className={classes.navIcon} icon={`${iconName}`} />}
            {props.name}
        </NavLink>
    );
}

const styles = createUseStyles({
    navItem : {
        display: 'block',
        width: '100%',
        padding: '15px',
        fontSize: '14px',
        color: '#808080',
        alignItems: 'center'
    },
    navIcon: {
        marginRight: '10px',
        width: '20px'
    },
    active: {
        color: '#2b2e33',
        fontWeight: 600,
        background: '#e9e9e9',
        borderRadius: '5px'
    }
})