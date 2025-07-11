import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { LocalStorageService } from "../services/LocalStorage.service";
import { ToastrService } from "ngx-toastr";
/*
export class HttpAuthInterceptor implements HttpInterceptor {

    localStorageService = inject(LocalStorageService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const token = this.localStorageService.getItem("token") || "";

        const token = "Bearer ";
        const request = req.clone({
            headers: req.headers.set('Authorization', token)
        });

        return next.handle(request);

    }
    
}
*/
export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const toast: ToastrService = inject(ToastrService);
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBzbWFydGxhYi5jb20iLCJpYXQiOjE3NTIxOTM2NTUsImV4cCI6MTc2NDE5MzY1NSwicm9sZXMiOlsiQURNSU4iXX0.PwQmn6cnFlFwXmG231UhMhWCwYRoV76OolGl44ZQLrI";
    const request = req.clone({
        headers: req.headers.set('Authorization', token)
    });

    return next(request).pipe(
        tap((response) => console.log(response)),
        catchError((err) => {
            toast.error(err.message, "Error inesperado", {positionClass: 'toast-bottom-right'});
            return throwError(() => err);
        })
    );
}