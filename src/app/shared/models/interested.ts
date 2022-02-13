import { Phone } from './phone';

export class Interested {
  constructor(
    public id?: string,
    public cpf?: string,
    public name?: string,
    public email?: string,
    public phones?: Array<Phone>
  ) {}

  toJson(): String {
    return JSON.stringify(this);
  }
}
