import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <div
                class="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center mr-3"
              >
                <i class="fas fa-flask text-white"></i>
              </div>
              <h1 class="text-2xl font-bold text-gray-900">
                SmartLab Dashboard
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">Bienvenido, {{ userEmail }}</span>
              <button
                (click)="logout()"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Panel de Control
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-blue-50 p-6 rounded-lg">
                <div class="flex items-center">
                  <div class="bg-blue-600 p-3 rounded-full">
                    <i class="fas fa-flask text-white"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Análisis</h3>
                    <p class="text-gray-600">
                      Gestionar análisis de laboratorio
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-green-50 p-6 rounded-lg">
                <div class="flex items-center">
                  <div class="bg-green-600 p-3 rounded-full">
                    <i class="fas fa-users text-white"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Pacientes</h3>
                    <p class="text-gray-600">Administrar pacientes</p>
                  </div>
                </div>
              </div>

              <div class="bg-purple-50 p-6 rounded-lg">
                <div class="flex items-center">
                  <div class="bg-purple-600 p-3 rounded-full">
                    <i class="fas fa-chart-line text-white"></i>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Reportes</h3>
                    <p class="text-gray-600">Generar reportes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userEmail = user.sub || 'Usuario';
    } else {
      // Si no hay usuario autenticado, redirigir al login
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
