import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directives/mask.directive';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
  declarations: [MaskDirective],
  imports: [CommonModule, HttpClientModule, HttpClientXsrfModule],
  exports: [MaskDirective],
})
export class SharedModule {}
