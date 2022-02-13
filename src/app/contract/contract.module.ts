import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  ContractComponent,
  ListingComponent,
  RegisterComponent,
} from './components';
import { ContractRoutingModule } from './contract-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ContractService, SharedModule } from '../shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ContractComponent, ListingComponent, RegisterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    SharedModule,
    ContractRoutingModule,
  ],
  providers: [ContractService],
})
export class ContractModule {}
