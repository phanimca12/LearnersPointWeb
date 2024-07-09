import { TestBed } from '@angular/core/testing';

import { XMLConversionService } from './xmlconversion.service';

describe('XMLConversionService', () => {
  let service: XMLConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XMLConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
