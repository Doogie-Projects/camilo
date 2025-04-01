import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private _loading: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
      }),
      catchError((err) => {
        this._loading.setLoading(false, request.url);
        return throwError(() => err);
      })
    );
  }
}
