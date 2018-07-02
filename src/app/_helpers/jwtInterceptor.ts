import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { ConfigValue } from './config-value';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private config: ConfigValue) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('token'));
    // console.log(currentUser);
    // console.log(currentUser);
    // console.log(request.url);
    if (request.url.startsWith(this.config.url_port)) {
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser}`
          }
        });
      }
    }
    return next.handle(request);
  }
}
