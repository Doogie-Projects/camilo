import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://aconocutgf.execute-api.us-east-1.amazonaws.com/v1/'

  constructor(private http: HttpClient) { }

  public getAllColab(): Observable<any> {
    const cachedData = localStorage.getItem('collaborators');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    const headers = new HttpHeaders().set('x-api-key', 'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4');
    return this.http.get<any>(`${this.url}get-all`, { headers }).pipe(
      tap(data => {
        localStorage.setItem('collaborators', JSON.stringify(data));
      })
    );
  }

  public createCollab(collaborator: any): Observable<any> {
    const headers = new HttpHeaders().set('x-api-key', 'MN70HmszY51RXTqUpXnRz3812ZLfhxtE8N0LPPg4');
    return this.http.put<any>(`${this.url}create`, collaborator, { headers });
  }
}
