import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export abstract class ModelsService<T, TData> {
  abstract readonly path: string;

  protected constructor(private httpService: HttpService) {}

  get(page: number, size: number): Observable<T[]> {
    return this.httpService.get<T[]>(this.path, page, size);
  }

  create(data: TData): Observable<HttpResponse<null>> {
    return this.httpService.post<TData>(this.path, data);
  }

  delete(id: number): Observable<HttpResponse<null>> {
    return this.httpService.delete(this.path, id);
  }
}
