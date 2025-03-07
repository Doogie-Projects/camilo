import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    
    if (this.email === 'camilo.barrera@gmail.com' && this.password === 'passwordcamilo') {
    
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}