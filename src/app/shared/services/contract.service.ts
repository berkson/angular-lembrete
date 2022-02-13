import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { HttpUtilService } from '..';
import { Contract } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  public static readonly CONTRACTS_PATH: string =
    env.baseApiHOff + 'contract/all';

  constructor(
    private httpClient: HttpClient,
    private httpUtils: HttpUtilService
  ) {}

  listAllContracts(
    page: number,
    direction: string,
    order: string
  ): Observable<any> {
    let url =
      ContractService.CONTRACTS_PATH +
      this.mountPageParams(page, direction, order);
    return this.httpClient.get(
      url,
      this.httpUtils.user.auth
        ? this.httpUtils.authHeaders(this.httpUtils.user.auth)
        : {}
    );
  }

  private mountPageParams(
    page: number,
    direction: string,
    order: string
  ): string {
    return `?pag=${page}&ord=${order}&dir=${direction}`;
  }
}
