import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL =
    'http://localhost:8080/api/v1/authentication/signin';
  private readonly TOKEN_KEY = 'auth_token';

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
    role: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.authStateSubject.next({
        isAuthenticated: true,
        token,
        user: this.decodeToken(token),
        loading: false,
        error: null,
        role: null //setear el role
      });
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    this.clearError();

    return this.http.post<LoginResponse>(this.API_URL, credentials).pipe(
      tap((response) => {
        this.handleLoginSuccess(response);
      }),
      catchError((error) => {
        this.handleLoginError(error);
        return throwError(() => error);
      })
    );
  }

  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    const user = this.decodeToken(response.token);

    this.authStateSubject.next({
      isAuthenticated: true,
      token: response.token,
      user,
      loading: false,
      error: null,
      role: response.role
    });
  }

  private handleLoginError(error: HttpErrorResponse): void {
    let errorMessage = 'Error de autenticación';

    if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 0) {
      errorMessage =
        'Error de conexión. Verifica que el servidor esté ejecutándose.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.authStateSubject.next({
      ...this.authStateSubject.value,
      loading: false,
      error: errorMessage,
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,
      role: null
    });
  }

  private setLoading(loading: boolean): void {
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      loading,
    });
  }

  private clearError(): void {
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      error: null,
    });
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  getCurrentUser(): any {
    return this.authStateSubject.value.user;
  }

  getRole(): any {
    return this.authStateSubject.value.role;
  }
}
