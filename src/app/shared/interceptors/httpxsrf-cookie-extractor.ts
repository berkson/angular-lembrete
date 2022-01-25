import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DOCUMENT,
  ɵparseCookieValue as parseCookieValue,
} from '@angular/common';

export const XSRF_COOKIE_NAME: InjectionToken<string> =
  new InjectionToken<string>('XSRF-TOKEN');
export const XSRF_HEADER_NAME: InjectionToken<string> =
  new InjectionToken<string>('X-XSRF-TOKEN');

@Injectable({
  providedIn: 'root',
})
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  private lastCookieString: string | null = '';
  private lastToken: string | null = null;
  private parseCount: number = 0;
  private MAX_RETRIES: number = 5;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    @Inject(PLATFORM_ID) private platform: string,
    @Inject(XSRF_COOKIE_NAME) private cookieName: string,
    private httpClient: HttpClient
  ) {}

  //make a HEAD request to retrieve the cookie
  //TODO: Verificar o uso

  headRequest(): Promise<any> {
    let promise = new Promise<void>((resolve, reject) => {
      console.log('head request:');
      this.httpClient
        .head('/_app/', { observe: 'response' })
        .toPromise()
        .then((response) => {
          console.log('headRequest resolved');
          this.lastCookieString = response!.headers.get(this.cookieName); //”X-XSRF-TOKEN”
          this.lastToken = response!.headers.get(
            this.lastCookieString != null ? this.lastCookieString : ''
          );
          resolve();
        })
        .catch((err) => {
          console.log('headRequest rejected');
          reject();
        });
    });

    return promise;
  }

  getToken(): string | null {
    if (this.platform === 'server') {
      //it should be ‘browser’
      return null;
    }

    do {
      console.log('retrying HEAD');
      this.parseCount++;
      console.log('expecting the promise: headRequest()');
      this.headRequest();
    } while (this.lastToken == null && this.parseCount < this.MAX_RETRIES);

    return this.lastToken;
  }
}
