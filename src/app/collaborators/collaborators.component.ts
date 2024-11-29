import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {

  constructor(private router: Router) { }

  editCollaborator(collaboratorId: string) {
    this.router.navigate(['/collaborators', collaboratorId]);
  }

  openModal() {
    const modal = document.getElementById('modal');
    modal?.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('modal');
    modal?.classList.add('hidden');
  }
}