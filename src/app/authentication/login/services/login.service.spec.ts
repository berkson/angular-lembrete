import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let httpClient: HttpClient;
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
