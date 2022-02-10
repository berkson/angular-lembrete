import { Company } from './company';
import { ContractType } from './contract-type';
import { Interested } from './interested';

export class Contract {
  constructor(
    public id?: number,
    public contractNumber?: string,
    public company?: Company,
    public initialDate?: string,
    public finalDate?: string,
    public contractType?: ContractType,
    public interested?: Array<Interested>
  ) {}
}
