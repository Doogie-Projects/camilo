import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { login: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log(this.loginData);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(this.loginData);
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }
}