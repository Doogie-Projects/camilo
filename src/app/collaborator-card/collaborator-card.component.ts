import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-collaborator-card',
  templateUrl: './collaborator-card.component.html',
  styleUrls: ['./collaborator-card.component.css'],
})
export class CollaboratorCardComponent {
  @Input() collaborator: any;
  isDeleteModalOpen = false;
  collaboratorEmailToDelete: string | null = null;

  constructor(private router: Router, private apiService: ApiService) {}

  editCollaborator(collaboratorId: string) {
    this.router.navigate(['/collaborators', collaboratorId]);
  }

  openDeleteModal(email: string): void {
    this.collaboratorEmailToDelete = email;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.collaboratorEmailToDelete = null;
  }

  confirmDelete(): void {
    if (this.collaboratorEmailToDelete) {
      this.deleteCollaborator(this.collaboratorEmailToDelete);
    }
    this.closeDeleteModal();
  }

  deleteCollaborator(collaboratorId: string): void {
    // const collaboratorId = this.collaborator.email;
    this.apiService.deleteCollab(collaboratorId).subscribe(
      (response) => {
        console.log('Collaborator deleted:', response);
        this.apiService.updateColab().subscribe(
          (updateResponse) => {
            console.log('Collaborators list updated:', updateResponse);
            window.location.reload();
            // this.cancelUpdate();
          },
          (updateError) => {
            console.error('Error updating collaborators list:', updateError);
          }
        );
      },
      (error) => {
        console.error('Error deleting collaborator:', error);
      }
    );
  }
}
