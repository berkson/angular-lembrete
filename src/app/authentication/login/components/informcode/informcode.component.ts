import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/shared';

@Component({
  selector: 'app-informcode',
  templateUrl: './informcode.component.html',
  styleUrls: ['./informcode.component.scss'],
})
export class InformcodeComponent implements OnInit {
  form: FormGroup;
  formPass: FormGroup;
  private _hidePassForm: boolean;
  private _hideForm: boolean;

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({});
    this.formPass = new FormGroup({});
    this._hideForm = false;
    this._hidePassForm = true;
  }

  ngOnInit(): void {
    this.generateForm();
    this.generateFormPass();
  }

  public get hidePassForm(): boolean {
    return this._hidePassForm;
  }
  public set hidePassForm(value: boolean) {
    this._hidePassForm = value;
  }

  public get hideForm(): boolean {
    return this._hideForm;
  }
  public set hideForm(value: boolean) {
    this._hideForm = value;
  }

  generateForm() {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator]],
      code: ['', [Validators.required]],
    });
  }

  generateFormPass() {
    this.formPass = this.fb.group({
      password: ['', [Validators.required]],
      confpass: ['', [Validators.required]],
    });
  }

  inform() {
    this._hideForm = true;
    this._hidePassForm = false;
  }

  newpass() {}
}
