import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/authentication/authentication-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Lubricant } from './pages/lubricant/lubricant';
import { Client } from './pages/client/client';

export const routes: Routes = [
    { path: '', component: AuthPageComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '' },
    {
        path: 'lubricant',
        component: Lubricant
    },
    {
        path: 'client',
        component: Client
    }
];
