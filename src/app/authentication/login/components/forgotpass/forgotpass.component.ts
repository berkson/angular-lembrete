import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import {
  ApiError,
  ErrorMessages,
  ErrorService,
  Messages,
} from 'src/app/shared';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {
  public readonly SEND_CODE_PATH: string = 'user/passrecover';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  forgot() {
    if (this.form.invalid) return;
    const form = this.form.value;
    this.httpClient
      .post(env.baseApiHOff + this.SEND_CODE_PATH, form.email, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status == 200)
            this.snackBar.open(Messages.emailSuccess, Messages.success, {
              duration: 5000,
            });
        })
      )
      .subscribe({
        error: (err) => {
          try {
            let errors: ApiError[] = err.error.errors;
            this.errorService.showSnack(errors);
          } catch (e) {
            this.errorService.snackMessage(ErrorMessages.tryAgain);
          }
        },
      });
  }
}
