import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFConversionChildComponent } from './pdfconversion-child.component';

describe('PDFConversionChildComponent', () => {
  let component: PDFConversionChildComponent;
  let fixture: ComponentFixture<PDFConversionChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDFConversionChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFConversionChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
