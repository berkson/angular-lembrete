import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpUtilService } from './shared/services';
import { environment as env } from 'src/environments/environment';
import { filter, finalize } from 'rxjs';
import { LoginService } from './authentication';
import { ErrorMessages, MessageService, User } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app-header.component.scss'],
})
export class AppComponent {
  constructor(
    private httpUtils: HttpUtilService,
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    // Verifica se a aplicação foi reinicializada e procede a verificação da sessão, se está ativa
    // https://stackoverflow.com/questions/56325272/detect-browser-refresh-in-angular-project
    console.log('construindo app!');
    if (localStorage.getItem('user') !== null) {
      let user: User = JSON.parse(localStorage.getItem('user')!);
      console.log('logando novamente: ' + user);
      this.router.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe(
          (event: { id: number; url: any; urlAfterRedirects: any }) => {
            if (event.id === 1 && event.url === event.urlAfterRedirects) {
              try {
                if (user.auth) {
                  this.httpUtils.user = user;
                  this.loginService.loginWithCredentialsOrHeader(user.auth);
                  this.httpUtils.authenticated = user.cpf !== null;
                  localStorage.removeItem('user');
                }
              } catch (e) {
                this.messageService.snackErrorMessage(ErrorMessages.tryAgain);
              }
            }
          }
        );
    }
  }

  // Salva o usuário no localstorage antes do refresh
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...', this.httpUtils.user);
    this.processData();
  }

  processData() {
    if (this.httpUtils.user.auth !== undefined)
      localStorage.setItem('user', JSON.stringify(this.httpUtils.user));
  }

  authenticated(): boolean {
    return this.httpUtils.authenticated;
  }

  exit() {
    this.httpUtils.exit();
  }
}
