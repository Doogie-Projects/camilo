import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FE-Camilo';

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
    });
  }

  logout() {
    this.authService.logout();
  }
}
