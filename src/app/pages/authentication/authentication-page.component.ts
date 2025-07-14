import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css',
})
export class AuthPageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.loading = state.loading;
        this.error = state.error;

        // Si está autenticado, redirigir al dashboard
        if (state.isAuthenticated) {
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: () => {
          // El manejo del éxito se hace en el servicio
        },
        error: (error) => {
          // El manejo del error se hace en el servicio
          console.error('Error en login:', error);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${
          fieldName === 'email' ? 'El correo electrónico' : 'La contraseña'
        } es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingrese un correo electrónico válido';
      }
      if (field.errors['minlength']) {
        return 'La contraseña debe tener al menos 1 carácter';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
