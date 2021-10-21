import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private behaviour: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  observable$ = this.behaviour.asObservable();

  constructor() { }

  getBehaviour$<T>(): Observable<T[]> {
    return this.observable$;
  }

  updateBehaviour<T>(data: T[]) {
    this.behaviour.next(data);
  }
}
