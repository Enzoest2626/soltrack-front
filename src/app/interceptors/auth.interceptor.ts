import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    
    const toast: ToastrService = inject(ToastrService);
    const token = authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next(req).pipe(
        catchError((err) => {
            toast.error(err.message, "Error inesperado", {positionClass: 'toast-bottom-right'});
            return throwError(() => err);
        })
    );
  }