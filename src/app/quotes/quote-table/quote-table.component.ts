import { Component, OnInit } from '@angular/core';
import {MessageBusService} from 'src/app/core/services/message-bus.service';
import {Quote} from '../quotes.service';

@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss']
})
export class QuoteTableComponent implements OnInit {

  quotes: Quote[] = [];

  constructor(
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
    this.messageBus.getBehaviour$().subscribe(q => {
      this.quotes = q as Quote[];
    })
  }

  getNumberColor(number: Number): string {
    let color = 'green';
    if ( number < 0 )
      color = 'red';

    return color;
  }
}
