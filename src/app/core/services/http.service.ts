import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpService {
  protected readonly httpClient: HttpClient;
  constructor(
    protected readonly injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
  }
  _get$<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(url, {params, headers})
    .pipe(catchError(httpError => EMPTY))
    ;
  }
  _post$<T>(url: string, body: any | undefined=undefined, headers: any ): Observable<T> {
    return this.httpClient.post<T>(url, body, {headers})
    .pipe(catchError(httpError => EMPTY))
    ;
  }
}
