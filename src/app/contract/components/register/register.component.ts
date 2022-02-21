import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractType, ContractTypeService } from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  types: Array<ContractType> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cotractTypeService: ContractTypeService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getTypes();
  }
  getTypes() {
    this.cotractTypeService.getAllContractTypes().subscribe({
      next: (data) => {
        console.log(data);
        this.types = data.contract_types;
      },
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      contractNumber: ['', [Validators.required]],
      company: ['', [Validators.required]],
      initialDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required]],
      contractType: ['', [Validators.required]],
      // TODO: dynamic add an interested.
    });
  }

  register() {
    let finalDate = moment(
      this.registerForm.get('initialDate')?.value,
      'DD/MM/YYYY'
    ).add(this.registerForm.get('finalDate')?.value, 'months');
    this.registerForm.patchValue({ finalDate: finalDate.format('YYYY-MM-DD') });
    console.log(this.registerForm.value);
  }
}
