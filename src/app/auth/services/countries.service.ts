import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country} from "../models/country";
import {environment as env} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${env.BASE_AUTH_URL}/countries`);
  }
}
