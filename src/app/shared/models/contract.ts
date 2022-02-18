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

  /**
   * Converte um ojeto contrato com as propriedades json em
   * um contrato com as propriedades padrão.
   * @param object objeto de resposta do backend.
   * @returns um contrato.
   */
  static fromObject(object: any): Contract {
    let contract = new Contract(
      object.id,
      object.contract_number,
      object.company,
      object.initial_date,
      object.final_date,
      new ContractType(
        object.contract_type.id,
        object.contract_type.code,
        object.contract_type.description,
        object.contract_type.max_validity
      ),
      //ContractType.fromJson(JSON.stringify(jsonObject.contract_type)),
      object.interested_list
    );

    return contract;
  }
}
