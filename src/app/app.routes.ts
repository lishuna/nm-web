import { LoginComponent } from './login/login.component';

export const AppRoutes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
     },
    {
        path: 'login',
        component: LoginComponent
    },
    {
		path: '**', // fallback router must in the last
		component: LoginComponent
    }
];