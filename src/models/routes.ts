import { IconName } from '@fortawesome/fontawesome-common-types';

export enum AppRoutes {
    Companies = 'companies',
    Employees = 'employees',
    Employee = 'employee',
    Home = '',
    Login = 'login',
    Responses = 'responses',
    Surveys = 'surveys'
}

export const AppRouteToIcon: {[key in AppRoutes]?: IconName} = {
    [AppRoutes.Home]: 'house',
    [AppRoutes.Employees]: 'users',
    [AppRoutes.Companies]: 'building'
};