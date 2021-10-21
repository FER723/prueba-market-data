import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import {QuotesComponent} from './quotes.component';
import {QuoteTableComponent} from './quote-table/quote-table.component';
import {QuotesService} from './quotes.service';


@NgModule({
  declarations: [
    QuotesComponent,
    QuoteTableComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule
  ],
  providers: [
    QuotesService
  ]
})
export class QuotesModule { }
