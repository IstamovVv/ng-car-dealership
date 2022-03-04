import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

import { environment as env } from "../../environments/environment";

function getRelativeUrl(path: string, ...rest: string[]) {
  const url = `${env.BASE_URL}/${path}`;
  rest.forEach(path => url.concat('/', path));

  return url;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(path: string, page: number, size: number): Observable<T> {
    const url = getRelativeUrl(path);
    const params = new HttpParams({
      fromObject: { page, size }
    });

    return this.http.get<T>(url, { params })
      .pipe(catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error('Failed to make get request: ' + err.message))
      }));
  }

  post<T>( path: string, data: T): Observable<HttpResponse<any>> {
    const url = getRelativeUrl(path);

    return this.http.post<any>(url, data, {
      observe: 'response'
    }).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(() => new Error('Failed to make post request: ' + err.message))
    }));
  }

  delete(path: string, id: number): Observable<HttpResponse<any>> {
    const url = getRelativeUrl(path, id.toString());

    return this.http.delete<any>(url, {
      observe: 'response',
      params: { id }
    }).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(() => new Error('Failed to make delete request: ' + err.message))
    }));
  }
}
