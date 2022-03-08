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
  public static readonly CONTRACTS_PATH: string = env.baseApiHOff + 'contract';
  public static readonly CONTRACTSLIST_PATH: string = `${ContractService.CONTRACTS_PATH}/all`;
  public static readonly NEWCONTRACT_PATH: string = `${ContractService.CONTRACTS_PATH}/new`;

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
      ContractService.CONTRACTSLIST_PATH +
      this.mountPageParams(page, direction, order);
    return this.httpClient.get(
      url,
      this.httpUtils.user.auth
        ? this.httpUtils.authHeaders(this.httpUtils.user.auth)
        : {}
    );
  }

  registerContract(contract: Contract): Observable<any> {
    return this.httpClient.post(
      ContractService.NEWCONTRACT_PATH,
      JSON.stringify(contract),
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
