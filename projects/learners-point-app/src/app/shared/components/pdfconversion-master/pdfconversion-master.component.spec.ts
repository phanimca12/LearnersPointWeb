import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFConversionMasterComponent } from './pdfconversion-master.component';

describe('PDFConversionMasterComponent', () => {
  let component: PDFConversionMasterComponent;
  let fixture: ComponentFixture<PDFConversionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDFConversionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFConversionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
