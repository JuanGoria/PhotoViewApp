import { RefreshTokenService } from './refresh-token.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private readonly unauthorizedStatus = 401;
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<string>('');

  constructor(protected readonly authService: AuthService,
              protected readonly refreshTokenService: RefreshTokenService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).pipe(
      catchError(error => {
        if (error && error.status === this.unauthorizedStatus) {
          return this.tokenErrorHandler(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAuthToken();
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
  }

  private tokenErrorHandler(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.isRefreshingToken) {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addToken(request))));
    }

    this.isRefreshingToken = true;
    this.tokenSubject.next(null);

    return this.refreshToken(request, next);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.refreshTokenService.refreshToken()
    .pipe(
      switchMap((resp) => {
        this.tokenSubject.next(resp);
        return next.handle(this.addToken(request));
      }),
      catchError(error => {
        this.authService.clean();
        return throwError(error);
      }),
      finalize(() => this.isRefreshingToken = false)
    );
  }
}
