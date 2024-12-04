import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-collaborator-detail',
  templateUrl: './collaborator-detail.component.html',
  styleUrls: ['./collaborator-detail.component.css'],
})
export class CollaboratorDetailComponent implements OnInit {
  collaborator: any;

  data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('collaboratorId');
    console.log('ID:', id);
    if (id) {
      this.loadCollaborator(id);
    }
  }

  loadCollaborator(id: string): void {
    const collaborators = JSON.parse(
      localStorage.getItem('collaborators') || '[]'
    );
    this.collaborator = collaborators.find(
      (collab: any) => collab.email === id
    );
    if (this.collaborator) {
      this.populateForm();
    }
  }

  populateForm(): void {
    (document.getElementById('new-name') as HTMLInputElement).value =
      this.collaborator.name;
    (document.getElementById('new-lastname') as HTMLInputElement).value =
      this.collaborator.lastName;
    (document.getElementById('new-id') as HTMLInputElement).value =
      this.collaborator.employeeID;
    (document.getElementById('new-email') as HTMLInputElement).value =
      this.collaborator.email;
    (document.getElementById('new-phone') as HTMLInputElement).value =
      this.collaborator.phone;
    (document.getElementById('new-ssid') as HTMLInputElement).value =
      this.collaborator.ssid;
    (document.getElementById('new-password') as HTMLInputElement).value =
      this.collaborator.password;
  }

  saveCollaborator() {
    const email = (document.getElementById('new-email') as HTMLInputElement)
      .value;
    const name = (document.getElementById('new-name') as HTMLInputElement)
      .value;
    const lastName = (
      document.getElementById('new-lastname') as HTMLInputElement
    ).value;
    const password = (
      document.getElementById('new-password') as HTMLInputElement
    ).value;
    const employeeID = (document.getElementById('new-id') as HTMLInputElement)
      .value;
    const phone = (document.getElementById('new-phone') as HTMLInputElement)
      .value;
    const ssid = (document.getElementById('new-ssid') as HTMLInputElement)
      .value;

    const collaborator = {
      email,
      name,
      lastName,
      password,
      employeeID,
      phone,
      ssid,
    };

    this.apiService.createCollab(collaborator).subscribe(
      (response) => {
        console.log('Collaborator updated:', response);
        this.apiService.updateColab().subscribe(
          (updateResponse) => {
            console.log('Collaborators list updated:', updateResponse);
            this.cancelUpdate();
          },
          (updateError) => {
            console.error('Error updating collaborators list:', updateError);
          }
        );
      },
      (error) => {
        console.error('Error updating collaborator:', error);
      }
    );
  }

  cancelUpdate() {
    this.location.back();
  }
}
