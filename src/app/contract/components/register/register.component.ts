import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CnpjValidator,
  ContractType,
  ContractTypeService,
  CpfValidator,
} from 'src/app/shared';
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

  get interested() {
    return this.registerForm.get('interested') as FormArray;
  }

  addInterested() {
    this.interested.push(
      this.fb.group({
        cpf: ['', [CpfValidator]],
        name: ['', [Validators.min(3)]],
        email: ['', [Validators.email]],
        phones: this.fb.array([this.fb.control('')]),
      })
    );
  }

  createForm() {
    this.registerForm = this.fb.group({
      contractNumber: ['', [Validators.required]],
      company: this.fb.group({
        cnpj: ['', [CnpjValidator]],
        name: ['', [Validators.min(5)]],
      }),
      initialDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required, Validators.max(60)]],
      contractType: ['', [Validators.required]],
      interested: this.fb.array([
        this.fb.group({
          cpf: ['', [CpfValidator]],
          name: ['', [Validators.min(3)]],
          email: ['', [Validators.email]],
          phones: this.fb.array([this.fb.control('')]),
        }),
      ]),
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
