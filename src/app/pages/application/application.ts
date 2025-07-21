import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComponentService } from '../../services/Component.service';
import { EquipoService } from '../../services/Equipo.service';
import { LubricantService } from '../../services/Lubricant.service';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { ApplicationService } from '../../services/Application.service';
import { MuestraService } from '../../services/Muestra.service';

@Component({
  selector: 'app-application',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './application.html',
  styleUrl: './application.css'
})
export class Application implements OnInit{
  
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  componentService: ComponentService = inject(ComponentService);
  equipoService: EquipoService = inject(EquipoService);
  lubricantService: LubricantService = inject(LubricantService);
  applicationService: ApplicationService = inject(ApplicationService);
  muestraService: MuestraService = inject(MuestraService);
  
  toastr: ToastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({
    equipo: ['', Validators.required],
    componente: ['', [Validators.required]],
    lubricante: ['', [Validators.required]]
  });

  listEquipo: any[] = [];
  listComponent: any[] = [];
  listLubricant: any[] = [];

  submitted: boolean = false;

  ngOnInit(): void {
    forkJoin([
      this.equipoService.findAll(),
      this.lubricantService.findAll()
    ]).subscribe((data: any[]) => {
      this.listEquipo = data[0];
      this.listLubricant = data[1];
    });
  }

  getComponents(): any {
    const idEquipo = this.form.get('equipo')?.value;

    if (!idEquipo) {
      this.toastr.error("El Equipo es invalido, seleccione uno correcto", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    }

    this.equipoService.findAllComponentsByIdEquipo(idEquipo)
      .subscribe((data) => this.listComponent = data);
  }

  save(): void {
    this.submitted = true;
    const isValid = this.form.invalid;

    if (isValid) {
      this.toastr.error("Selecciones todos los campos validos", "Incorrecto", {positionClass: 'toast-bottom-right'});
      this.submitted = false;
      return;
    }

    const data = this.form.value;

    this.applicationService.save().pipe(
      switchMap((res) => this.muestraService.save(res.idSolicitud, data)),
      finalize(() => this.submitted = false)
    ).subscribe(() => {
      this.toastr.success("Solicitud de muestra registrado", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/home']);
    })
  }

  back() {
    this.router.navigate(["/home"]);
  }
}
