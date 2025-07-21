import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipoService } from '../../services/Equipo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipo',
  imports: [ReactiveFormsModule ],
  templateUrl: './equipo.html',
  styleUrl: './equipo.css'
})
export class Equipo{
  // services
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  EquipoService: EquipoService = inject(EquipoService);
  toastr: ToastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({

    nombreEquipo: [null, [Validators.required]],
    marcaEquipo: [null, [Validators.required]],
    modeloEquipo: [null, [Validators.required]],

  })


  save() {
    if (this.form.invalid) {
      this.toastr.error("Llene todos los campos", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    };

    const data = this.form.value;

    this.EquipoService.save(data).subscribe((data) => {
      this.toastr.success("Equipo Registrado", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(["/home"], {skipLocationChange: true});
    });

  }

  back() {
    this.router.navigate(["/home"]);
  }
}
