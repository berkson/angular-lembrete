import { Phone } from './phone';

export class Interested {
  constructor(
    public id?: number,
    public cpf?: string,
    public name?: string,
    public email?: string,
    public phones?: Array<Phone>
  ) {}

}
