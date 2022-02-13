export class ContractType {
  constructor(
    public id?: number,
    public code?: string,
    public description?: string,
    public maxValidity?: number
  ) {}

  toJson(): string {
    return `{
        "id":${this.id},
        "code":${this.code},
        "description":${this.description},
        "max_validity":${this.maxValidity}
    }`;
  }

  static fromJson(jsonString: string): ContractType {
    let jsonObject = JSON.parse(jsonString);
    let contractType = new ContractType(
      jsonObject.id,
      jsonObject.code,
      jsonObject.description,
      jsonObject.max_validity
    );
    return contractType;
  }
}
