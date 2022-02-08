import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directives/mask.directive';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuardService, MessageService } from './services';

@NgModule({
  declarations: [MaskDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [MaskDirective],
})
export class SharedModule {}
