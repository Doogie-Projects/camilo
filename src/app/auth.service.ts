import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'camilo.barrera@gmail.com' && password === 'passwordcamilo') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  }
}