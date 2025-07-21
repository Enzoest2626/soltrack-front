import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultadoService } from '../../services/Resultado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-resultado.html',
  styleUrl: './list-resultado.css'
})
export class ListResultado implements OnInit {
  
  // Services
  router: Router = inject(Router);
  resultadoService: ResultadoService = inject(ResultadoService);
  toastr: ToastrService = inject(ToastrService);
  
  resultados: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadResultados();
  }

  loadResultados(): void {
    this.loading = true;
    this.resultadoService.findAll().subscribe({
      next: (data) => {
        this.resultados = data;
        this.loading = false;
        console.log('Resultados cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar resultados:', error);
        this.toastr.error("Error al cargar los resultados", "Error", {positionClass: 'toast-bottom-right'});
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(["/home"]);
  }

  goToRegistrar(): void {
    this.router.navigate(["/home/registrar-resultados"]);
  }
}