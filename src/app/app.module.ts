import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorDetailComponent } from './collaborator-detail/collaborator-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    CollaboratorsComponent,
    CollaboratorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
