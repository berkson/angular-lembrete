import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const cookieheaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    if (csrfToken !== null && !req.headers.has(cookieheaderName)) {
      console.log('Token: ' + csrfToken);
      req = req.clone({
        headers: req.headers.set(cookieheaderName, csrfToken),
      });
    }
    return next.handle(req);
  }
}
