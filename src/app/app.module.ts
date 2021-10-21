import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Observable} from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppService} from './app.service';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function getToken$(appService: AppService): () => Observable<any> {
  return () => appService.getToken$();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [HttpClient]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getToken$,
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
