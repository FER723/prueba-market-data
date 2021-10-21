import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from './core/services/http.service';

@Injectable()
export class AppService extends HttpService {

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
    })
  }

  getData$(): Observable<any> {
    return this._get$<any>(`${environment.base_url}/quotes/2970161-1058-814?fields= LVAL_NORM,CLOSE_ADJ_NORM,NC2_PR_NORM,NC2_NORM,VOL,TUR,PY_CLOSE,YTD_PR_NORM`, undefined, new HttpHeaders().set('Authorization', ''));
  }

}


