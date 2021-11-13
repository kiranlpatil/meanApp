import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionStorageService } from "./session.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  setHeaders() {
    let headers = new HttpHeaders({});
    const token = SessionStorageService.getSessionValue("access_token");
    if (token) {
      headers = headers.append("token", token);
    }
    return headers;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
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
          this.openSnackBar("Please login first", "");
          this.router.navigateByUrl("/login");
          console.log("hihih");
        }
        return throwError(response);
      })
    );
  }
}
