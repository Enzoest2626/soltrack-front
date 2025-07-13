import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LubricantService } from '../../core/services/Lubricant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lubricant',
  imports: [ReactiveFormsModule ],
  templateUrl: './lubricant.html',
  styleUrl: './lubricant.css'
})
export class Lubricant {
  // services
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  lubricantService: LubricantService = inject(LubricantService);
  toastr: ToastrService = inject(ToastrService);
  
  form: FormGroup = this.fb.group({
    codigoLub: [null, [Validators.required]],
    nombreLub: [null, [Validators.required]],
    fabricante: [null, [Validators.required]],
    tipoFabricante: [null],
    viscosidad: [null, [Validators.required]],
    densidad: [null, [Validators.required]],
    puntoIgnicion: [null, [Validators.required]],
    recomendacion: [null],
    observacion: [null] 
  }) 


  save() {
    if (this.form.invalid) {
      this.toastr.error("Llene todos los campos", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    };

    const data = this.form.value;

    this.lubricantService.save(data).subscribe((data) => {
      this.toastr.success("Lubricante registrado", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(["/dashboard"], {skipLocationChange: true});
    });
      
  }

  back() {
    this.router.navigate(["/dashboard"]);
  }
}
