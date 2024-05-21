import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  errorCase(event: HttpErrorResponse) {
    switch (event.status) {
      case 401:
        window.location.href = window.location.origin;
        break;
      case 403:
        break;
      case 503:

        break;
      case 500:

        break


    }
  }
  randomString(length: number, chars: string | any[]) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headersObj: any = {};
    let tokenObj = sessionStorage.getItem('token');
    let token: any = tokenObj ? JSON.parse(tokenObj) : '';
    if (request.url.indexOf("?RemoveAuthToken") == -1) {
      headersObj['Authorization'] = 'Bearer ' + token;
    } else {
      request = request.clone({ url: request.url.split('?RemoveAuthToken')[0] });
    }
    headersObj['RId'] = this.randomString(22, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').toUpperCase();
    request = request.clone({
      setHeaders: headersObj
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const temp = event.body && event.body.data ? event.body.data.token : undefined;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errorCase(err);
      }
    }));
  }
}
