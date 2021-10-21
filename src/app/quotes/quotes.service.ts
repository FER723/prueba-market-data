import {HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {environment} from './../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from '../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService extends HttpService{

  private behaviour: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
  observable$ = this.behaviour.asObservable();

  constructor(
    protected readonly injector: Injector
  ) {
    super(injector);
  }

  getQuotes$(): Observable<any> {
    return this._get$<any>(`${environment.base_url}/quotes/2970161-1058-814?fields= LVAL_NORM,CLOSE_ADJ_NORM,NC2_PR_NORM,NC2_NORM,VOL,TUR,PY_CLOSE,YTD_PR_NORM`, undefined, new HttpHeaders().set('Authorization', ''));
  }

  getBehaviour$(): Observable<Quote[]> {
    return this.observable$;
  }

  updateBehaviour(quotes: Quote[]) {
    this.behaviour.next(quotes);
  }
}

export class Quote {
  close_adj_norm: Field;
  lval_norm: Field;
  nc2_norm: Field;
  nc2_pr_norm: Field;
  py_close: Field;
  tur: Field;
  vol: Field;
  ytd_pr_norm: Field;
}

export interface Field {
  d: Date;
  dly: Number;
  gen: Number;
  v: Number;
  z: Number;
}
