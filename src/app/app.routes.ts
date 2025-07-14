import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/authentication/authentication-page.component';
import { AuthGuard } from './guards/auth.guard';
import { Lubricant } from './pages/lubricant/lubricant';
import { Client } from './pages/client/client';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './base/home/home';

export const routes: Routes = [
    { path: '', component: AuthPageComponent },
    {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: Dashboard 
            },
            {
                path: 'lubricant',
                component: Lubricant
            },
            {
                path: 'client',
                component: Client
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    { path: '**', redirectTo: '' },
];
