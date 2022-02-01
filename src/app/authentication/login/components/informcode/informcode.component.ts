import { ThisReceiver } from '@angular/compiler';
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

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator]],
      code: ['', [Validators.required]],
    });
  }

  inform() {}
}
