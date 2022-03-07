import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, mapTo, Observable, of, tap } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Tokens } from "../models/tokens";
import { AuthResponse } from "../models/authResponse";
import { nullUser, User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!) || nullUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${env.BASE_AUTH_URL}/login`, user).pipe(
      tap((response: AuthResponse) => this.doLoginUser(response.user, response.token))
    );
  }

  logout() {
    return this.http.post<any>(`${env.BASE_AUTH_URL}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap(() => this.doLogoutUser()))
  }

  refreshToken() {
    return this.http.post<any>(`${env.BASE_URL}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => this.storeAccessToken(tokens.accessToken)))
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLoginUser(user: User, tokens: Tokens) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUserSubject.next(user);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    localStorage.removeItem('currentUser');

    this.currentUserSubject.next(nullUser);
    this.removeTokens();
  }

  private storeAccessToken(jwt: string) {
    localStorage.setItem(this.ACCESS_TOKEN, jwt);
  }

  private storeRefreshToken(refresh: string) {
    localStorage.setItem(this.REFRESH_TOKEN, refresh);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
