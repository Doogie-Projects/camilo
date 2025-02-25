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
    // Aquí puedes agregar la lógica de autenticación
    if (this.email === 'admin@example.com' && this.password === 'password') {
      // Redirigir al usuario a la página principal después de iniciar sesión
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}