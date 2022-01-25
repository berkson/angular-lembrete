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
import { CustomInterceptor } from './shared/interceptors/custom-interceptor';
import {
  HttpXsrfCookieExtractor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
} from './shared/interceptors/httpxsrf-cookie-extractor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LoginModule,
    LoginRoutingModule,
    FlexLayoutModule,

    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: CustomInterceptor,
      multi: true,
    },
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
