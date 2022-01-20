import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../components';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly PATH: string = 'user';

  constructor(private httpClient: HttpClient) {}

  login(credentials: Credentials): Observable<any> {
    // TODO: Verificar melhor maneira de autenticar
    return this.httpClient.get(env.baseApiUrl + this.PATH, credentials);
  }
}
