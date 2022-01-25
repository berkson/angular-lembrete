import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CpfValidator } from 'src/app/shared';
import { HttpUtilService } from 'src/app/shared/services';
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
    private snack: MatSnackBar,
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
    console.log(JSON.stringify(credentials));
    this.loginService.login(credentials).subscribe({
      next: (data) => {
        this.httpUtils.authenticated = data.cpf !== null;
        console.log(JSON.stringify(data));
      },
      error: (err) => {
        console.log(JSON.stringify(err));
        this.httpUtils.authenticated = false;
        console.log('Erro ao logar!');
      },
    });
  }
}
