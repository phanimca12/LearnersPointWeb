import { TestBed } from '@angular/core/testing';
import { AwdJobApiClientParserService } from './awd-job-api-client-parser.service';
import { data } from './awd-job-api-client-parser.service.spec-data';


describe('AwdJobApiClientParserService', () => {
  let service: AwdJobApiClientParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(AwdJobApiClientParserService);
  });

  it('smoke tests', () => {
    expect(service).toBeTruthy();
  });

  describe('tcAJAXGetUserScreenNames parser', () => {
    it('should handle single item response', () => {
      const res = service.parse('tcAJAXGetUserScreenNames', data.tcAJAXGetUserScreenNames[0]);
      expect(Array.isArray(res)).toBeTrue();
      expect(res.length).toBe(1);
      expect(res[0].screenName).toBe('LKWTQDTE');
    });
    it('should handle empty response', () => {
      const res = service.parse('tcAJAXGetUserScreenNames', data.tcAJAXGetUserScreenNames[1]);
      expect(Array.isArray(res)).toBeTrue();
      expect(res.length).toBe(0);
    });
    it('should handle multi item response', () => {
      const res = service.parse('tcAJAXGetUserScreenNames', data.tcAJAXGetUserScreenNames[2]);
      expect(Array.isArray(res)).toBeTrue();
      expect(res.length).toBe(2);
      expect(res[0].screenName).toBe('LKWTQDTE');
    });
  });

  describe('tcAJAXGetUserScreenDefinition parser', () => {
    it('should handle successful response', () => {
      const res = service.parse('tcAJAXGetUserScreenDefinition', data.tcAJAXGetUserScreenDefinition[0]);
      expect(res).toBeTruthy();
      expect(res.screenName).toBe('FLDXMPL');
    });
    it('should handle error response', () => {
      expect(function () {
        service.parse('tcAJAXGetUserScreenDefinition', data.tcAJAXGetUserScreenDefinition[1]);
      }).toThrow(new Error('An unknown error has been encountered, please contact an Administrator'));
    });
  });

  describe('tcAJAXSaveUserScreenDefinition parser', () => {
    it('should handle successful response', () => {
      const res = service.parse('tcAJAXSaveUserScreenDefinition', data.tcAJAXSaveUserScreenDefinition[0]);
      expect(res).toBeTruthy();
      expect(res).toBe('success');
    });
    it('should handle error response', () => {
      expect(function () {
        service.parse('tcAJAXSaveUserScreenDefinition', data.tcAJAXSaveUserScreenDefinition[1]);
      }).toThrow(new Error('An unknown error has been encountered, please contact an Administrator'));
    });
  });

  describe('tcAJAXDeleteUserScreenDefinition parser', () => {
    it('should handle successful response', () => {
      const res = service.parse('tcAJAXDeleteUserScreenDefinition', data.tcAJAXDeleteUserScreenDefinition[0]);
      expect(res).toBeTruthy();
      expect(res).toBe('success');
    });
    it('should handle error response', () => {
      expect(function () {
        service.parse('tcAJAXDeleteUserScreenDefinition', data.tcAJAXDeleteUserScreenDefinition[1]);
      }).toThrow(new Error('An unknown error has been encountered, please contact an Administrator'));
    });
  });
});
