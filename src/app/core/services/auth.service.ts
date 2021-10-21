import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  constructor(
    protected readonly injector: Injector
  ) {
    super(injector);
  }
  getToken$(): Observable<any>{
    const {
      uname: username= undefined,
      pwd: password = undefined,
      cId: credentialId = undefined,
      cPwd: credentialPassword = undefined
    } = environment._credentials || {};

    return this._post$<any>(`${environment.base_url}/oauth/token?grant_type=password&username=${username}&scope=uaa.user&password=${password}`, {}, {
      Authorization: `Basic ${btoa(`${credentialId}:${credentialPassword}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }
  get tokenRequest(): HttpRequest<any> {
    const {
      uname: username= undefined,
      pwd: password = undefined,
      cId: credentialId = undefined,
      cPwd: credentialPassword = undefined
    } = environment._credentials || {};
    return new HttpRequest('POST', `${environment.base_url}/oauth/token?grant_type=password&username=${username}&scope=uaa.user&password=${password}`, {}, {
      headers: new HttpHeaders().set( 'Authorization', `Basic ${btoa(`${credentialId}:${credentialPassword}`)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }
}
