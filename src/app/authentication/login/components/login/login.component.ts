import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ApiError,
  CpfValidator,
  ErrorMessages,
  MessageService,
} from 'src/app/shared';
import { HttpUtilService } from 'src/app/shared';
import { LoginService } from '../../services';
import { Credentials } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private errorService: MessageService,
    private router: Router,
    private loginService: LoginService,
    private httpUtils: HttpUtilService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, CpfValidator]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  get cpf() {
    return this.form.get('cpf');
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    const credentials: Credentials = this.form.value;
    this.loginService.login(credentials).subscribe({
      next: (data) => {
        this.httpUtils.authenticated = data.cpf !== null;
      },
      error: (err) => {
        try {
          this.httpUtils.authenticated = false;
          let errors: ApiError[] = err.error.errors;
          this.errorService.showSnackErrors(errors);
        } catch (e) {
          this.errorService.snackErrorMessage(ErrorMessages.tryAgain);
        }
      },
    });
  }
}
