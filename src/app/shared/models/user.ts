import { Role } from './role';

export class User {
  constructor(
    public id?: number,
    public cpf?: string,
    public email?: string,
    public name?: string,
    public enabled?: boolean,
    public roles?: Array<Role>
  ) {}
}
