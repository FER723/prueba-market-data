import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import {QuotesComponent} from './quotes.component';
import {QuoteTableComponent} from './quote-table/quote-table.component';
import {QuotesService} from './quotes.service';
import {ColorNumberDirective} from '../core/directives/color-number.directive';


@NgModule({
  declarations: [
    QuotesComponent,
    QuoteTableComponent,
    ColorNumberDirective
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
