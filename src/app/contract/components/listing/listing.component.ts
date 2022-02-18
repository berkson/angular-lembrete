import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contract, ContractService, HttpUtilService } from 'src/app/shared';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  dataSource: MatTableDataSource<Contract>;
  columns!: string[];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private contractService: ContractService,
    private httpUtils: HttpUtilService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.columns = [
        'id',
        'contract_number',
        'initial_date',
        'final_date',
        'contract_type',
        'company',
      ];
    } else {
      this.columns = [
        'contract_number',
        'initial_date',
        'final_date',
        'contract_type',
        'company',
      ];
    }
    this.queryData();
  }

  queryData() {
    this.contractService
      .listAllContracts(
        this.paginator.pageIndex,
        this.sort.direction,
        this.sort.active ? this.sort.active : ''
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          const contracts = data.content.map((obj: any) =>
            Contract.fromObject(obj)
          );
          this.dataSource.data = contracts;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      });
  }

  isAdmin(): boolean {
    return this.httpUtils.isAdmin();
  }
}
