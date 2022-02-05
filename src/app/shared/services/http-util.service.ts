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

  authHeaders(credentials: Credentials) {
    // gera o valor do cabeçalho básico de autenticação com criptografia 64
    let authValue: string = `Basic ${btoa(
      credentials.username + ':' + credentials.password
    )}`;
    const headers = new HttpHeaders(
      credentials ? { Authorization: authValue } : {}
    );

    return { headers: headers };
  }
}
