import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule, LoginRoutingModule } from './authentication';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HttpXsrfTokenExtractor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  HttpXsrfCookieExtractor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
  HttpXsrfInterceptor,
  XhrInterceptor,
} from './shared';
import { ContractModule, ContractRoutingModule } from './contract';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LoginModule,
    LoginRoutingModule,
    FlexLayoutModule,
    ContractModule,
    ContractRoutingModule,

    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: HttpXsrfInterceptor,
      multi: true,
    },
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
