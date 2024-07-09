import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64ConversionMasterComponent } from './base64-conversion-master.component';

describe('Base64ConversionMasterComponent', () => {
  let component: Base64ConversionMasterComponent;
  let fixture: ComponentFixture<Base64ConversionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Base64ConversionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64ConversionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
