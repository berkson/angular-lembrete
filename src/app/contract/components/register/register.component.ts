import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CnpjValidator,
  Company,
  Contract,
  ContractService,
  ContractType,
  ContractTypeService,
  CpfValidator,
  Interested,
} from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  basicForm: FormGroup = new FormGroup({});
  companyForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  types: Array<ContractType> = [];
  contract: Contract;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cotractTypeService: ContractTypeService,
    private contractService: ContractService
  ) {
    this.contract = new Contract();
  }

  ngOnInit(): void {
    this.createForms();
    this.getTypes();
  }
  getTypes() {
    this.cotractTypeService.getAllContractTypes().subscribe({
      next: (data) => {
        //console.log(data);
        this.types = data.contract_types;
      },
    });
  }

  get interested() {
    return this.contactForm.get('interested') as FormArray;
  }

  get interestedSize() {
    return this.interested.length;
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

  removeInterested(index: number) {
    this.interested.removeAt(index);
  }

  interestedPhones(index: number) {
    return this.interested.at(index).get('phones') as FormArray;
  }

  interestedPhonesSize(index: number) {
    return this.interestedPhones(index).length;
  }

  addPhone(index: number) {
    this.interestedPhones(index).push(this.fb.control(''));
  }

  removePhone(index: number) {
    let size = this.interestedPhonesSize(index);
    if (size > 1) this.interestedPhones(index).removeAt(size - 1);
  }

  createForms() {
    this.companyForm = this.fb.group({
      cnpj: ['', [CnpjValidator]],
      name: ['', [Validators.min(5)]],
    });
    this.contactForm = this.fb.group({
      interested: this.fb.array([
        this.fb.group({
          cpf: ['', [CpfValidator]],
          name: ['', [Validators.min(3)]],
          email: ['', [Validators.email]],
          phones: this.fb.array([this.fb.control('')]),
        }),
      ]),
    });
    this.basicForm = this.fb.group({
      contractNumber: ['', [Validators.required]],
      initialDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required, Validators.max(60)]],
      contractType: ['', [Validators.required]],
    });
  }

  private treatAndAddDates() {
    let baseDate = moment(
      this.basicForm.get('initialDate')?.value,
      'DD/MM/YYYY'
    );
    this.contract.initialDate = baseDate.format('YYYY-MM-DD');
    this.contract.finalDate = baseDate
      .add(this.basicForm.get('finalDate')?.value, 'months')
      .format('YYYY-MM-DD');
  }

  private AddBasicInfo() {
    this.contract.contractNumber = this.basicForm.get('contractNumber')?.value;
    this.contract.contractType = this.basicForm.get('contractType')?.value;
  }

  private AddCompanyInfo() {
    this.contract.company = new Company(
      0,
      this.companyForm.get('cnpj')?.value,
      this.companyForm.get('name')?.value
    );
  }

  private AddInterested() {
    this.contract.interested = [];
    this.interested.controls.forEach((c) => {
      let person = new Interested(
        0,
        c.value.cpf,
        c.value.name,
        c.value.email,
        c.value.phones
      );
      this.contract.interested?.push(person);
    });
  }

  register() {
    this.treatAndAddDates();
    this.AddBasicInfo();
    this.AddCompanyInfo();
    this.AddInterested();
    if (
      !this.basicForm.valid ||
      !this.companyForm.valid ||
      !this.contactForm.valid
    )
      return;

    this.contractService.registerContract(this.contract); // continuar daqui
  }
}
