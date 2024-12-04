import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://aconocutgf.execute-api.us-east-1.amazonaws.com/v1/';

  constructor(private http: HttpClient) {}

  public getAllColab(): Observable<any> {
    const cachedData = localStorage.getItem('collaborators');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    const headers = new HttpHeaders().set(
      'x-api-key',
      'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4'
    );
    return this.http.get<any>(`${this.url}get-all`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem('collaborators', JSON.stringify(data));
      })
    );
  }

  public createCollab(collaborator: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-api-key',
      'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4'
    );
    return this.http.put<any>(`${this.url}create`, collaborator, { headers });
  }

  public updateColab(): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-api-key',
      'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4'
    );

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
    const headers = new HttpHeaders().set(
      'x-api-key',
      'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4'
    );
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
