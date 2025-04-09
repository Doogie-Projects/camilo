import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `https://30rqpfktlf.execute-api.us-east-1.amazonaws.com/v1/login`;
  private apiKey = 'SgHuL19F7T8nzhbKMVDjo3Ysjp7IMfRo28d6U0jY';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: { login: string; password: string }): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post(this.apiUrl, loginData, { headers }).pipe(
      tap((response: any) => {
        this.storeTokens(response.accessToken, response.refreshToken);
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión', error);
        throw error;
      })
    );
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}
