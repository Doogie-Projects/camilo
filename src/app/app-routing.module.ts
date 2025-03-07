import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records/records.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorDetailComponent } from './collaborator-detail/collaborator-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'collaborators', component: CollaboratorsComponent, canActivate: [AuthGuard] },
  { path: 'collaborators/:collaboratorId', component: CollaboratorDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/records', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }