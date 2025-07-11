import { Component, inject } from '@angular/core';
import { ClientService } from '../../core/services/Client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  imports: [ReactiveFormsModule, CommonModule, ToastrModule],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client {

  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  clientService: ClientService = inject(ClientService);
  toastr: ToastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({
    ruc: [null, [Validators.required, Validators.maxLength(11)]],
    nombreComercial: [null, [Validators.required]],
  });

  razonSocial: string = '';

  searchByRuc(e: any) {
    const ruc = this.form.get('ruc')?.value;
    const hasErrorRuc = this.form.get('ruc')?.invalid;

    if(hasErrorRuc) {
      this.toastr.error("El RUC es invalido", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    };

    

    this.clientService.findByRuc(ruc)
      .pipe(tap((data) =>  {
        this.razonSocial = data.razonSocial;
      }))
    .subscribe();
  }

  save() {
    const data = this.form.value;

    if (this.form.invalid) {
      this.toastr.error("Llene todos los campos", "Incorrecto", {positionClass: 'toast-bottom-right'});
      return;
    }

    this.clientService.save(data).subscribe(() => {
      this.toastr.success("Cliente registrado", "Exitoso", {positionClass: 'toast-bottom-right'});
      this.router.navigate(["/dashboard"], {
        skipLocationChange: true
      })
    })
  }

  back() {
    this.router.navigate(["/dashboard"]);
  }
}
