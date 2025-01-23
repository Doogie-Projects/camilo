import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  public getAllColab(): Observable<any> {
    const cachedData = localStorage.getItem('collaborators');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<any>(`${this.url}get-all`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem('collaborators', JSON.stringify(data));
      })
    );
  }

  public createCollab(collaborator: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put<any>(`${this.url}create`, collaborator, { headers }).pipe(
      tap((data) => {
        // Remove existing 'collaborators' information from localStorage
        localStorage.removeItem('collaborators');
      })
    );
  }

  public updateColab(): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);

    return this.http.get<any>(`${this.url}get-all`, { headers }).pipe(
      tap((data) => {
        // Remove existing 'collaborators' information from localStorage
        localStorage.removeItem('collaborators');

        // Save the new data in localStorage
        localStorage.setItem('collaborators', JSON.stringify(data));
      })
    );
  }

  public deleteCollab(collaboratorId: string): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    const email = new HttpParams().set('email', collaboratorId);
    return this.http
      .delete<any>(`${this.url}delete/`, { headers, params: email })
      .pipe(
        tap((data) => {
          // Remove existing 'collaborators' information from localStorage
          localStorage.removeItem('collaborators');

          // Save the new data in localStorage
          localStorage.setItem('collaborators', JSON.stringify(data));
        })
      );
  }
}