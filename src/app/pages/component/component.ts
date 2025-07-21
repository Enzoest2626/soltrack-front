import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentService } from '../../services/Component.service';
import { ToastrService } from 'ngx-toastr';
import { EquipoService } from '../../services/Equipo.service';

@Component({
  selector: 'app-component',
  imports: [ReactiveFormsModule ],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class component implements OnInit{
  
  // services
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  ComponentService: ComponentService = inject(ComponentService);
  equipoService: EquipoService = inject(EquipoService);
  toastr: ToastrService = inject(ToastrService);

  listEquipo: any[] = [];

  form: FormGroup = this.fb.group({
    nombreComponente: [null, [Validators.required]],
    idEquipo: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.equipoService.findAll().subscribe((data) => this.listEquipo = data);
  }

  save() {
    if (this.form.invalid) {
      this.toastr.error("Llene todos los campos", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    };

    const data = this.form.value;

    this.ComponentService.save(data).subscribe((data) => {
      this.toastr.success("Componente Registrado", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(["/home"], {skipLocationChange: true});
    });

  }

  back() {
    this.router.navigate(["/home"]);
  }
}
