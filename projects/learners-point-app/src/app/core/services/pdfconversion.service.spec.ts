import { TestBed } from '@angular/core/testing';

import { PdfconversionService } from './pdfconversion.service';

describe('PdfconversionService', () => {
  let service: PdfconversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfconversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
