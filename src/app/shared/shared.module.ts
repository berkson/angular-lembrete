import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directives/simplemask.directive';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuardService, MessageService } from './services';
import { BrDatePipe } from './pipes/br-date.pipe';

@NgModule({
  declarations: [MaskDirective, BrDatePipe],
  imports: [CommonModule, HttpClientModule],
  exports: [MaskDirective, BrDatePipe],
})
export class SharedModule {}
