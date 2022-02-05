import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessages, Messages } from '../messages';
import { ApiError } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snack: MatSnackBar) {}

  showSnackErrors(errors: ApiError[]): void {
    if (errors.length > 1) this.multiError(errors);
    else this.oneError(errors[0]);
  }

  /**
   * Mostra a mensagem na snackbar por 5 segundos
   * @param message mensagem a ser mostrada na snackbar
   */
  snackErrorMessage(message: string) {
    this.snack.open(message, ErrorMessages.error, {
      duration: 5000,
      panelClass: ['style-error'],
      verticalPosition: 'top',
    });
  }

  /**
   * Mostra a mensagem na snackbar por 5 segundos
   * @param message mensagem a ser mostrada na snackbar
   */
  snackSuccessMessage(message: string) {
    this.snack.open(message, Messages.success, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  private oneError(error: ApiError): void {
    this.snack.open(error.message, ErrorMessages.error, {
      duration: 5000,
      panelClass: ['style-error'],
      verticalPosition: 'top',
    });
  }

  private multiError(errors: ApiError[]): void {
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
      panelClass: ['style-error'],
      verticalPosition: 'top',
    });
  }
}
