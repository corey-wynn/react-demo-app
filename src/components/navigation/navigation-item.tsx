import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
import { NavigationItem } from "./navigation.model";

export default function NavigationItemComponent(props: NavigationItem) {
    return (
        <NavLink
            className={({ isActive }) => (isActive ? styles().active : styles().navItem)}
            to={`/${props.route}`}
        >
            {props.name}
        </NavLink>
    );
}

const styles = createUseStyles({
    navItem : {
        display: 'block',
        width: '100%',
        padding: '10px',
        borderBottom: '1px solid black'
    },
    active: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontWeight: 600,
        borderBottom: '1px solid black'
    }
})