import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { BaseService } from './base.service';

@Injectable()
export class HttpDelegateService extends BaseService {
  constructor(protected http: HttpClient) {
    super();
  }

  getAPI(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .get(url, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  putAPI(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put(url, JSON.stringify(body), httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  postAPI(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post(url, JSON.stringify(body), httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  deleteAPI(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .delete(url, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
