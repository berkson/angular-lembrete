import { Phone } from "./phone";

export class Interested {
  constructor(
    public id?: string,
    public cpf?: string,
    public name?: string,
    public email?: string,
    public phone?: Phone
    ) {}
}
