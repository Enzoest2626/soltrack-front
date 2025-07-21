import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultadoService } from '../../services/Resultado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-resultados',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-resultados.html',
  styleUrl: './registrar-resultados.css'
})
export class RegistrarResultados {
  
  // Services
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  resultadoService: ResultadoService = inject(ResultadoService);
  toastr: ToastrService = inject(ToastrService);
  
  form: FormGroup = this.fb.group({
    // Campos que coinciden con RequestMuestra
    idMuestra: [null, [Validators.required]],
    viscosidad: [null, [Validators.required]],
    oxidacion: [null, [Validators.required]], 
    nitracion: [null, [Validators.required]],
    agua: [null, [Validators.required]]
  });

  save() {
    if (this.form.invalid) {
      this.toastr.error("Llene todos los campos obligatorios", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    }

    const request = this.form.value;
    console.log(request);

    this.resultadoService.save(request).subscribe((data) => {
      this.toastr.success("Resultado registrado exitosamente", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(["/home"], {skipLocationChange: true});
    });
  }

  back() {
    this.router.navigate(["/home"]);
  }
}