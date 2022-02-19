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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    ContractRoutingModule,
  ],
  providers: [ContractService],
})
export class ContractModule {}
