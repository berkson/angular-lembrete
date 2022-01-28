import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessages } from '../messages';
import { ApiError } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snack: MatSnackBar) {}

  showSnack(errors: ApiError[]): void {
    if (errors.length > 1) this.multiError(errors);
    else this.oneError(errors[0]);
  }

  oneError(error: ApiError): void {
    this.snack.open(error.message, ErrorMessages.error, {
      duration: 5000,
    });
  }

  multiError(errors: ApiError[]): void {
    let message = '';

    for (let i = 0; i < errors.length; i++) {
      if (i == errors.length - 1) {
        message += errors[i].message;
        break;
      }
      message += errors[i].message + '\n';
    }

    this.snack.open(message, ErrorMessages.error, {
      duration: 5000,
    });
  }
}
