import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorDetailComponent } from './collaborator-detail/collaborator-detail.component';

const routes: Routes = [
  { path: 'records', component: RecordsComponent },
  { path: 'collaborators', component: CollaboratorsComponent},
  { path: 'collaborators/:collaboratorId', component: CollaboratorDetailComponent},
  {path: '**', redirectTo: '/records', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
