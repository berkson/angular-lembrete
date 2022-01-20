import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CpfValidator } from 'src/app/shared';

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
    private router: Router
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      cpf: ['', Validators.required, CpfValidator],
      password: ['', Validators.required, Validators.min(6)],
    });
  }

  login() {
    if (this.form.invalid) {
      this.snack.open('Dados inválidos', 'Erro', { duration: 5000 });
      return;
    }

    alert(JSON.stringify(this.form.value));
  }
}
