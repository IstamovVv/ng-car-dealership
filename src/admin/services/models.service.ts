import { Injectable } from '@angular/core';
import { HttpService } from "./utils/http.service";
import { Observable } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export interface IModelsActionObserver {
  onSuccess?: Function,
  onFailure?: Function,
}

@Injectable({
  providedIn: 'root'
})
export abstract class ModelsService<T, TData> {
  abstract readonly path: string;

  protected constructor(private httpService: HttpService) {}

  get(page: number, size: number, observer: IModelsActionObserver) {
    this._makeRequest(this._makeGetRequest.bind(this), observer, page, size);
  }

  create(data: TData, observer: IModelsActionObserver) {
    this._makeRequest(this._makePostRequest.bind(this), observer, data);
  }

  delete(id: number, observer: IModelsActionObserver) {
    this._makeRequest(this._makeDeleteRequest.bind(this), observer, id);
  }

  _makeRequest(requestFunction: Function, observer: IModelsActionObserver, ...args: any[]) {
    requestFunction(...args).subscribe({
      next: (response: any) => observer.onSuccess?.(response),
      error: (error: HttpErrorResponse) => observer.onFailure?.(error),
    })
  }

  _makeGetRequest(page: number, size: number): Observable<T[]> {
    return this.httpService.get<T[]>(this.path, page, size);
  }

  _makePostRequest(data: TData): Observable<HttpResponse<null>> {
    return this.httpService.post<TData>(this.path, data);
  }

  _makeDeleteRequest(id: number): Observable<HttpResponse<null>> {
    return this.httpService.delete(this.path, id);
  }
}
