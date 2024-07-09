import { TestBed } from '@angular/core/testing';

import { AwdWindowUtil } from './awd-window-util';

describe('AwdWindowUtil', () => {
  let service: AwdWindowUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwdWindowUtil],
    });
    service = TestBed.inject(AwdWindowUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBrowserWindow', () => {
    it('should work', () => {
      expect(service.getBrowserWindow()).toBeTruthy();
    });
  });
});
