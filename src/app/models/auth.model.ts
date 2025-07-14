export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  role: string | null;
}
