import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directives/mask.directive';



@NgModule({
  declarations: [
    MaskDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
