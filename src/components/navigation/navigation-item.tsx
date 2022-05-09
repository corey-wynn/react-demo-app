import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
import { AppRouteToIcon } from "../../models/routes";
import { NavigationItem } from "./navigation.model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function NavigationItemComponent(props: NavigationItem) {
    const iconName = AppRouteToIcon[props.route];
    return (
        <NavLink
            className={({ isActive }) => (isActive ? styles().active : styles().navItem)}
            to={`/${props.route}`}
        >   
            {AppRouteToIcon[props.route] 
                && <FontAwesomeIcon className={classNames(styles().navIcon)} icon={`${iconName}`} />}
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
        display: 'block',
        width: '100%',
        padding: '15px',
        fontSize: '14px',
        color: '#000000',
        fontWeight: 600
    }
})