import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenService } from './services/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshing: boolean = false;
  private _refresh: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let req = request;

    const token = this._tokenService.token;
    
    if(token && !req.url.includes('/api/token')) {
      req = request.clone({headers: request.headers.set('Authorization', `${token.token_type} ${token.access_token}`)})    
    }
    
    return next.handle(req).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && !req.url.includes('/api/token') && error.status === 401) {
        return this.refreshToken(req, next);
      }
      return throwError(() => new Error(error));
    }))
  }

  refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this._refresh.next(null);
      return this._tokenService.generate().pipe(
        switchMap(token => {
          this.isRefreshing = false;
          this._tokenService.token = token;
          this._refresh.next(token);
          let req = request.clone({headers: request.headers.set('Authorization', `${token.token_type} ${token.access_token}`)});
          return next.handle(req);
        }),
        catchError(err => {
          this.isRefreshing = false;
          return throwError(() => new Error(err));
        })
      )
    }
    return this._refresh.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => {
        let req = request.clone({headers: request.headers.set('Authorization', `${token.token_type} ${token.access_token}`)});
        return next.handle(req);
      })
    );
  }
}
