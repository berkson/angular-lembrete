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
  public static readonly CHECKCONTRACT_PATH: string = `${ContractService.CONTRACTS_PATH}/check`;

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
      this.httpUtils.user.auth ? this.httpUtils.authHeaders() : {}
    );
  }

  checkIfContractExists(number: string): Observable<any> {
    return this.httpClient.post(ContractService.CHECKCONTRACT_PATH, number, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }

  registerContract(contract: Contract): Observable<any> {
    return this.httpClient.post(
      ContractService.NEWCONTRACT_PATH,
      contract.toJSON(),
      { headers: this.getHeaders(), observe: 'response' }
    );
  }

  private mountPageParams(
    page: number,
    direction: string,
    order: string
  ): string {
    return `?pag=${page}&ord=${order}&dir=${direction}`;
  }

  private getHeaders() {
    let headers = this.httpUtils.user.auth
      ? this.httpUtils.authHeaders().headers
      : {};
    return headers;
  }
}
