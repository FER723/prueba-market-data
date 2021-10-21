import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MessageBusService} from '../core/services/message-bus.service';
import {Quote, QuotesService} from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  constructor(
    private quotesService: QuotesService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    this.quotesService.getQuotes$()
    .pipe(
          switchMap(val => {
            const { quotes } = val;
            let arrayQuotes =
              quotes.map((q: any) => {
                  const { CLOSE_ADJ_NORM, LVAL_NORM, NC2_NORM, NC2_PR_NORM, PY_CLOSE, TUR, VOL, YTD_PR_NORM } = q.fields || {}
                  let _q: Quote = {
                  close_adj_norm: CLOSE_ADJ_NORM,
                  lval_norm: LVAL_NORM,
                  nc2_norm: NC2_NORM,
                  nc2_pr_norm: NC2_PR_NORM,
                  py_close: PY_CLOSE,
                  tur: TUR,
                  vol: VOL,
                  ytd_pr_norm: YTD_PR_NORM
              };
              return _q;
            });
            return of(arrayQuotes)
          })
    ).subscribe(result => {
      this.sendQuote(result as Quote[]);
    })
  }

  sendQuote(quotes: Quote[]) {
    this.messageBus.updateBehaviour(quotes);
  }
}
