import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {

  data: any [] = [];

  constructor(private router: Router, private apiService: ApiService) { }

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
    // window.location.reload()
  }

  saveCollaborator() {
    const email = (document.getElementById('new-email') as HTMLInputElement).value;
    const name = (document.getElementById('new-name') as HTMLInputElement).value;
    const lastName = (document.getElementById('new-lastname') as HTMLInputElement).value;
    const password = (document.getElementById('new-password') as HTMLInputElement).value;
    const employeeID = (document.getElementById('new-id') as HTMLInputElement).value;
    const phone = (document.getElementById('new-phone') as HTMLInputElement).value;
    const ssid = (document.getElementById('new-ssid') as HTMLInputElement).value;

    const collaborator = {
      email,
      name,
      lastName,
      password,
      employeeID,
      phone,
      ssid
    };

    this.apiService.createCollab(collaborator).subscribe(response => {
      console.log('Collaborator updated:', response);
      this.loadCollaborators();
      this.closeModal();
      this.clearForm();
    }, error => {
      console.error('Error updating collaborator:', error);
    });
  }

  loadCollaborators() {
    this.apiService.getAllColab().subscribe((response: any[]) => {
      this.data = response;
    });
  }

  clearForm() {
    (document.getElementById('new-email') as HTMLInputElement).value = '';
    (document.getElementById('new-name') as HTMLInputElement).value = '';
    (document.getElementById('new-lastname') as HTMLInputElement).value = '';
    (document.getElementById('new-password') as HTMLInputElement).value = '';
    (document.getElementById('new-id') as HTMLInputElement).value = '';
    (document.getElementById('new-phone') as HTMLInputElement).value = '';
    (document.getElementById('new-ssid') as HTMLInputElement).value = '';
  }
  
  ngOnInit() {
    this.apiService.getAllColab().subscribe((response: any[]) => {
      this.data = response;
    });
  }

  getAllColab() {
    this.apiService.getAllColab().subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  }
}