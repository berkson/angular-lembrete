import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directives/mask.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MaskDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [MaskDirective],
})
export class SharedModule {}
