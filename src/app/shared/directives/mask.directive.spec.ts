import createSpyObj = jasmine.createSpyObj;
import { ElementRef } from '@angular/core';
import { MaskDirective } from './mask.directive';

let element: ElementRef = createSpyObj('idNaicsRef', ['nativeElement']);

describe('MaskDirective', () => {
  it('should create an instance', () => {
    const directive = new MaskDirective(element);
    expect(directive).toBeTruthy();
  });
});
