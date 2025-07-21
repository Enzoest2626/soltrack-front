import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/authentication/authentication-page.component';
import { AuthGuard } from './guards/auth.guard';
import { Lubricant } from './pages/lubricant/lubricant';
import { Client } from './pages/client/client';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './base/home/home';
import { ListClient } from './pages/list-client/list-client';
import { ListLubricant } from './pages/list-lubricant/list-lubricant';
import { Application } from './pages/application/application';

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
                path: 'client-list',
                component: ListClient
            },
            {
                path: 'lubricant-list',
                component: ListLubricant
            },
            {
                path: 'application',
                component: Application
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    { path: '**', redirectTo: '' },
];
