import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  authService = inject(AuthService);

  // Obtener el rol de la URL
  router: Router = inject(Router);

  // Definir las funcionalidades por rol
  roleFunctions: any = {
    ADMIN: [
      {
        title: "Registrar Lubricante",
        description: "Gestionar el registro de lubricantes en el sistema",
        icon: "fas fa-oil-can",
        color: "from-green-500 to-emerald-600",
        href: "/home/lubricant",
      },
      {
        title: "Listar Lubricante",
        description: "Listado lubricantes registrados",
        icon: "fas fa-user-plus",
        color: "from-blue-500 to-cyan-600",
        href: "/home/lubricant-list",
      },
      {
        title: "Registrar Cliente",
        description: "Crear y gestionar cuentas de clientes",
        icon: "fas fa-user-plus",
        color: "from-blue-500 to-cyan-600",
        href: "/home/client",
      },
      {
        title: "Listar Cliente",
        description: "Listado clientes registrados",
        icon: "fas fa-user-plus",
        color: "from-blue-500 to-cyan-600",
        href: "/home/client-list",
      },

    ],
    CLIENTE: [
      {
        title: "Registrar Equipo",
        description: "Registrar equipos para análisis de lubricantes",
        icon: "fas fa-cogs",
        color: "from-purple-500 to-violet-600",
        href: "registrar-equipo.html",
      },

      {
        title: "Registrar Componente",
        description: "Registrar Componente",
        icon: "fas fa-clipboard-list",
        color: "from-orange-500 to-red-600",
        href: "/home/component",
      },
      {
        title: "Registrar Solicitud",
        description: "Crear solicitudes de análisis de muestras",
        icon: "fas fa-clipboard-list",
        color: "from-orange-500 to-red-600",
        href: "/home/application",
      },
    ],
    ANALISTA: [
      {
        title: "Registrar Resultados",
        description: "Ingresar resultados de análisis de muestras",
        icon: "fas fa-microscope",
        color: "from-indigo-500 to-purple-600",
        href: "/home/registrar-resultados",
      },
      {
        title: "Listar Resultados",
        description: "Ver todos los resultados de análisis registrados",
        icon: "fas fa-list",
        color: "from-green-500 to-emerald-600",
        href: "/home/resultado-list",
      },
    ],
  };

  functions: any[] = [];

  goTo(url: string): void {
    this.router.navigate([url])
  }

  ngOnInit(): void {
    const role = this.authService.getRole();

    this.functions = this.roleFunctions[role] || []
  }
}
