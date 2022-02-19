import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIResponse } from "../models";

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

    return this.http.get<T>(url, { params });
  }

  post<T=null>( path: string, data: any): Observable<HttpResponse<T>> {
    const url = getRelativeUrl(path);

    return this.http.post<T>(url, data, {
      observe: 'response'
    });
  }

  delete<T=null>(path: string, id: number): Observable<HttpResponse<T>> {
    const url = getRelativeUrl(path, id.toString());

    return this.http.delete<T>(url, {
      observe: 'response',
      params: { id }
    });
  }
}
