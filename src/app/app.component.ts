import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FE-Camilo';
  
  ngOnInit() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
    });
  }
}
