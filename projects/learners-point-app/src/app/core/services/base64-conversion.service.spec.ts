import { TestBed } from '@angular/core/testing';

import { Base64ConversionService } from './base64-conversion.service';

describe('Base64ConversionService', () => {
  let service: Base64ConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
