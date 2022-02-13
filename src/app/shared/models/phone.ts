export class Phone {
  constructor(public tel?: string) {}
  toJson() {
    return JSON.stringify(this);
  }
}
