import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/authentication';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  private _authenticated: boolean;
  private _user: User = new User();

  constructor() {
    this._authenticated = false;
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public get authenticated(): boolean {
    return this._authenticated;
  }
  public set authenticated(value: boolean) {
    this._authenticated = value;
  }

  authHeaders(credentials: Credentials | string) {
    // usuário já está logado
    if (typeof credentials === 'string') {
      const headers = new HttpHeaders(
        credentials ? { Authorization: credentials } : {}
      );
      return { headers: headers };
    }
    // primeiro login
    let auth = `Basic ${btoa(
      credentials.username + ':' + credentials.password
    )}`;
    const headers = new HttpHeaders(credentials ? { Authorization: auth } : {});

    return { headers: headers };
  }
}
