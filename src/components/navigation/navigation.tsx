import { createUseStyles } from "react-jss";
import { AppRoutes } from "../../models/routes";
import { LoggedInUserComponent } from "../logged-in-user/logged-in-user";
import NavigationItemComponent from "./navigation-item";
import { NavigationItem } from "./navigation.model";

export default function NavigationComponent() {
    const classes = styles();
    const navItems: NavigationItem[] = [
        {
            name: 'Companies',
            route: AppRoutes.Companies,
        },
        {
            name: 'Employees',
            route: AppRoutes.Employees,
        }
    ]
    return (
        <div className={classes.navContainer}>
            <LoggedInUserComponent />
            {navItems.map((navItem, index) => <NavigationItemComponent key={index} route={navItem.route} name={navItem.name} />)}
        </div>
    );
}

const styles = createUseStyles({
    navContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        width:'100%',
        height: '100%',
        padding: '15px',
        overflow: 'scroll'
    }
})