import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.css']
})
export class CollaboratorCardComponent {
  @Input() collaborator: any;

  constructor(private router: Router) { }

  editCollaborator(collaboratorId: string) {
    this.router.navigate(['/collaborators', collaboratorId]);
  }

}
