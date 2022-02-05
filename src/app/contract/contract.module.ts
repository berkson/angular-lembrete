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

@NgModule({
  declarations: [ContractComponent, ListingComponent, RegisterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    ContractRoutingModule,
  ],
})
export class ContractModule {}
