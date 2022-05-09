import { createUseStyles } from "react-jss";
import { AppRoutes } from "../../models/routes";
import NavigationItemComponent from "./navigation-item";
import { NavigationItem } from "./navigation.model";

export default function NavigationBar() {
    const navItems: NavigationItem[] = [
        {
            name: 'Home',
            route: AppRoutes.Home,
        },
        {
            name: 'Employees',
            route: AppRoutes.Employees,
        },
        {
            name: 'Companies',
            route: AppRoutes.Companies,
        }
    ]
    return (
        <div className={styles().navContainer}>
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