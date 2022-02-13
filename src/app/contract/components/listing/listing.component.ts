import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contract, HttpUtilService } from 'src/app/shared';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  dataSource: MatTableDataSource<Contract>;
  columns!: string[];
  public readonly url: string = '/contract/register';

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private router: Router, private httpUtils: HttpUtilService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.columns = [
        'id',
        'contract_number',
        'initial_date',
        'contract_type',
        'company',
      ];
    } else {
      this.columns = [
        'contract_number',
        'initial_date',
        'contract_type',
        'company',
      ];
    }
  }

  redirect() {
    this.router.navigate(['/contract/register']);
  }

  isAdmin(): boolean {
    return this.httpUtils.isAdmin();
  }
}
