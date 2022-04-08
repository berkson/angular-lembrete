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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PtBrMatPaginatorIntl } from './shared/intl';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    LoginModule,
    LoginRoutingModule,
    FlexLayoutModule,
    ContractModule,
    ContractRoutingModule,
    MatMomentDateModule,

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
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
