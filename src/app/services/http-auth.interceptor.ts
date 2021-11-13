import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from './session.service';
import {Constants} from '../shared/constants';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  setHeaders() {
    let headers = new HttpHeaders({});
    const token = SessionStorageService.getSessionValue(Constants.accessToken);
    if (token) {
      headers = headers.append(Constants.token, token);
    }
    return headers;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: this.setHeaders(),
    });
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.openSnackBar(Constants.loginFirst);
          this.router.navigateByUrl('/login').then();
        }
        return throwError(response);
      })
    );
  }
}
