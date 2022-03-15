import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

function getRelativeUrl(url: string, path: string, ...rest: string[]) {
  url += `/${path}`;
  rest.forEach(path => url.concat('/', path));

  return url;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, path: string, page: number, size: number): Observable<T> {
    url = getRelativeUrl(url, path);
    const params = new HttpParams({
      fromObject: { page, size }
    });

    return this.http.get<T>(url, { params });
  }

  post<T>(url: string, path: string, data: T): Observable<HttpResponse<any>> {
    url = getRelativeUrl(url, path);

    return this.http.post<any>(url, data, {
      observe: 'response'
    });
  }

  delete(url: string, path: string, id: number): Observable<HttpResponse<any>> {
    url = getRelativeUrl(url, path, id.toString());

    return this.http.delete<any>(url, {
      observe: 'response',
      params: { id }
    });
  }
}
