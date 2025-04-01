import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorCardComponent } from './collaborator-card/collaborator-card.component';
import { ApiService } from './service/api.service';
import { CollaboratorDetailComponent } from './collaborator-detail/collaborator-detail.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    CollaboratorsComponent,
    CollaboratorCardComponent,
    CollaboratorDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }