import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ErrorMessages, Messages } from '../messages';
import { ApiError, ValidationError } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snack: MatSnackBar) {}

  showSnackErrors(errors: ApiError[]): void {
    if (errors.length > 1) {
      let messages: string[] = errors.map((e) => e.message);
      this.multiError(messages);
    } else this.oneError(errors[0]);
  }

  showSnackErrorsDetails(errors: ValidationError[]): void {
    let messages: string[] = [];
    errors.forEach((e) => {
      e.details.forEach((m) => {
        messages.push(m.split(':')[1].trim());
      });
    });
    this.multiError(messages, 'bottom');
  }

  /**
   * Mostra a mensagem na snackbar por 5 segundos
   * @param message mensagem a ser mostrada na snackbar
   */
  snackErrorMessage(
    message: string,
    buttonMessage: string = ErrorMessages.error
  ) {
    this.snack.open(message, buttonMessage, {
      duration: 5000,
      panelClass: ['style-error'],
      verticalPosition: 'top',
    });
  }

  /**
   * Mostra a mensagem na snackbar por 5 segundos
   * @param message mensagem a ser mostrada na snackbar
   * @param buttonMessage mensagem que aparece no botão ao lado na snackbar. M
   * ensagem padrão Sucesso
   */
  snackSuccessMessage(
    message: string,
    buttonMessage: string = Messages.success
  ) {
    this.snack.open(message, buttonMessage, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  private oneError(error: ApiError | string): void {
    if (typeof error === 'string') {
      this.snack.open(error, ErrorMessages.error, {
        duration: 5000,
        panelClass: ['style-error'],
        verticalPosition: 'bottom',
      });
    } else {
      this.snack.open(error.message, ErrorMessages.error, {
        duration: 5000,
        panelClass: ['style-error'],
        verticalPosition: 'top',
      });
    }
  }

  private multiError(
    errors: string[],
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ): void {
    let message = '';

    for (let i = 0; i < errors.length; i++) {
      if (i == errors.length - 1) {
        message += errors[i];
        break;
      }
      message += errors[i] + '\n';
    }

    this.snack.open(message, ErrorMessages.error, {
      duration: 5000,
      panelClass: ['style-error'],
      verticalPosition: verticalPosition,
    });
  }
}
