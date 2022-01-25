import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './shared/services';
import { environment as env } from 'src/environments/environment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app-header.component.scss'],
})
export class AppComponent {
  constructor(
    private httpUtils: HttpUtilService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  authenticated(): boolean {
    return this.httpUtils.authenticated;
  }

  exit() {
    this.httpClient
      .post(env.baseUrl + 'logout', {})
      .pipe(
        finalize(() => {
          //this.httpUtils.authenticated = false;
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
