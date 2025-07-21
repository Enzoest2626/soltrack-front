import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/authentication/authentication-page.component';
import { AuthGuard } from './guards/auth.guard';
import { Lubricant } from './pages/lubricant/lubricant';
import { Client } from './pages/client/client';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './base/home/home';
import { ListClient } from './pages/list-client/list-client';
import { ListLubricant } from './pages/list-lubricant/list-lubricant';
import { RegistrarResultados } from './pages/registrar-resultados/registrar-resultados';
import { ListResultado } from './pages/list-resultado/list-resultado';
import { Application } from './pages/application/application';
import { Equipo } from './pages/equipo/equipo';
import { component } from './pages/component/component';

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
                path: 'equipo',
                component: Equipo
            },
            {
                path: 'component',
                component: component
            },
            {
                path: 'application',
                component: Application
            },
            {
                path: 'resultado-list',
                component: ListResultado
            },
            {
                path: 'registrar-resultados',
                component: RegistrarResultados
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    { path: '**', redirectTo: '' },
];
