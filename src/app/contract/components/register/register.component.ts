import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
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

  register() {}
}
