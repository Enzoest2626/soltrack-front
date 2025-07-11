import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  // Obtener el rol de la URL
  urlParams = new URLSearchParams(window.location.search);
  role: string = 'administrador'
  router: Router = inject(Router);

  // Definir las funcionalidades por rol
  roleFunctions: any = {
    administrador: [
      {
        title: "Registrar Lubricante",
        description: "Gestionar el registro de lubricantes en el sistema",
        icon: "fas fa-oil-can",
        color: "from-green-500 to-emerald-600",
        href: "/lubricant",
      },
      {
        title: "Registrar Cliente",
        description: "Crear y gestionar cuentas de clientes",
        icon: "fas fa-user-plus",
        color: "from-blue-500 to-cyan-600",
        href: "/client",
      },
    ],
    cliente: [
      {
        title: "Registrar Equipo",
        description: "Registrar equipos para análisis de lubricantes",
        icon: "fas fa-cogs",
        color: "from-purple-500 to-violet-600",
        href: "registrar-equipo.html",
      },
      {
        title: "Registrar Solicitud",
        description: "Crear solicitudes de análisis de muestras",
        icon: "fas fa-clipboard-list",
        color: "from-orange-500 to-red-600",
        href: "registrar-solicitud.html",
      },
    ],
    analista: [
      {
        title: "Registrar Resultados",
        description: "Ingresar resultados de análisis de muestras",
        icon: "fas fa-microscope",
        color: "from-indigo-500 to-purple-600",
        href: "registrar-resultados.html",
      },
    ],
  };

  functions: any[] = this.roleFunctions[this.role] || [];


  // Función para navegar a otras páginas
  navigateTo(page: any) {
    window.location.href = page;
  }

  // Función para cerrar sesión
  logout() {
    window.location.href = "index.html";
  }

  goTo(url: string): void {
    this.router.navigate([url])
  }
}
