import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor extends AuthService implements HttpInterceptor {
  protected token: string | undefined;
  constructor(
    protected readonly injector: Injector
  ) {
    super(injector);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( request.url.indexOf('oauth/token') !== -1 ) {
      return next.handle(request).pipe(tap( tokenResponse => {
        if ( tokenResponse instanceof HttpResponse ){
          const { body: {access_token=undefined}={} } = tokenResponse as any || {};
          this.token = access_token;
        }
      } ));
    }
    if ( !request.headers.get('Accept') ){
      request = request.clone({headers: request.headers.set('Accept', 'application/vnd.solid-v1.0+json')});
    }
    if ( request.headers.get('authorization') !== undefined ){
      request = request.clone({headers: request.headers.delete('authorization').set('authorization', `Bearer ${this.token}`)});
    }

    return next.handle(request).pipe( catchError(err => {
      if ( err.statusText && err.statusText === 'Unknown Error' && err.status === 0 ) {
        return next.handle(this.tokenRequest).pipe(
          concatMap( tokenResp => {
            if ( tokenResp instanceof HttpResponse ) {
              const { body: {access_token=undefined}={} } = tokenResp || {};
              this.token = access_token;
              return next.handle(request.clone({headers: request.headers.delete('authorization').set('authorization', `Bearer ${this.token}`)}))
            }
            return of(tokenResp);
          } )
        );
      }
      return of(err);
    }));
  }
}
