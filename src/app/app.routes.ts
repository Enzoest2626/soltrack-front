import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/authentication/authentication-page.component';
import { authGuard } from './core/guard/AuthGuard';
import { Dashboard } from './base/dashboard/dashboard';
import { Lubricant } from './pages/lubricant/lubricant';
import { Client } from './pages/client/client';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthPageComponent
    },
    {
        path: 'dashboard',
        component: Dashboard,
        //canActivate: [authGuard],
    },
    {
        path: 'lubricant',
        component: Lubricant
    },
    {
        path: 'client',
        component: Client
    }
];
