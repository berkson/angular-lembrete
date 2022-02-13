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

  toJson(): string {
    return `{
        "id": ${this.id},
        "contract_number": ${this.contractNumber},
        "company": ${this.company},
        "initial_date": ${this.initialDate},
        "final_date": ${this.finalDate},
        "contract_type": ${this.contractType?.toJson()},
        "interested_list": ${JSON.stringify(this.interested)}
      }`;
  }

  static fromJson(jsonString: any): Contract {
    let jsonObject = jsonString;
    let contract = new Contract(
      jsonObject.id,
      jsonObject.contract_number,
      jsonObject.company,
      jsonObject.initial_date,
      jsonObject.final_date,
      ContractType.fromJson(JSON.stringify(jsonObject.contract_type)),
      jsonObject.interested_list
    );

    return contract;
  }
}
