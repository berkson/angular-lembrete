import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformcodeComponent } from './informcode.component';

describe('InformcodeComponent', () => {
  let component: InformcodeComponent;
  let fixture: ComponentFixture<InformcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
