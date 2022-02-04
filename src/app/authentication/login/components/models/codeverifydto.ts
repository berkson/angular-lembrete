export class CodeVerifyDTO {
  constructor(
    private _cpf: string,
    private _code: string,
    private _password: string
  ) {}
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
  }
  public get cpf(): string {
    return this._cpf;
  }
  public set cpf(value: string) {
    this._cpf = value;
  }
}
