import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from 'src/app/shared';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  public readonly url: string = '/contract/register';

  constructor(private router: Router, private httpUtils: HttpUtilService) {}

  ngOnInit(): void {
    console.log('usuário logado: ' + JSON.stringify(this.httpUtils.user));
  }

  redirect() {
    this.router.navigate(['/contract/register']);
  }
}
