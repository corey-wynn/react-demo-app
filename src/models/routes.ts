import { IconName } from '@fortawesome/fontawesome-common-types';

export enum AppRoutes {
    Login = 'login',
    Home = '',
    Employees = 'employees',
    Companies = 'companies',
    Responses = 'responses'
}

export const AppRouteToIcon: {[key in AppRoutes]?: IconName} = {
    [AppRoutes.Home]: 'house',
    [AppRoutes.Employees]: 'users',
    [AppRoutes.Companies]: 'building'
};