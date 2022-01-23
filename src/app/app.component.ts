import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app-header.component.scss'],
})
export class AppComponent {
  constructor(private httpUtils: HttpUtilService, private router: Router) {}

  authenticated(): boolean {
    return this.httpUtils.authenticated;
  }

  exit() {
    this.httpUtils.authenticated = false;
    this.router.navigate(['/']);
  }
}
