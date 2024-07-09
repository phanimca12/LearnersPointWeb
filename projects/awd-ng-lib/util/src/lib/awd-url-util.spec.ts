import { TestBed } from '@angular/core/testing';
import { AwdUrlUtil } from './awd-url-util';
import { AwdWindowUtil } from './awd-window-util';

function buildLocationObj(url) {
  const protocol = url.split('//')[0];
  const search = '?' + url.split('?')[1];
  const host = url.split('//')[1].split('/')[0];
  const pathname = url.split(host)[1].split('?')[0];
  return {
    href: url,
    protocol,
    search,
    host,
    pathname,
    hostname: host.split(':')[0],
    port: host.split(':')[1],
    origin: protocol + '//' + host,
  };
}

describe('AwdUrlUtil', () => {
  let mockWin: any;
  const mockWinUtil = {
    getBrowserWindow: () => {
      return mockWin;
    },
  };
  let service: AwdUrlUtil;

  beforeEach(() => {
    mockWin = {
      location: {
        protocol: 'https',
      },
    };
    TestBed.configureTestingModule({
      providers: [
        AwdUrlUtil,
        { provide: AwdWindowUtil, useValue: mockWinUtil },
      ],
    });
    service = TestBed.inject(AwdUrlUtil);
  });

  describe('#getCurrentURL', () => {
    it('should return expected URL string', () => {
      mockWin.location = buildLocationObj('http://example.com/test');
      expect(service.getCurrentUrl()).toEqual(mockWin.location.href);
    });
  });

  describe('#getParamMap', () => {
    it('should return expected param map', () => {
      const url = 'http://example.com/test?test1=val1&test2=val2';
      const paramMap = service.getUrlParamMap(url);
      expect(paramMap.test1).toEqual('val1');
      expect(paramMap.test2).toEqual('val2');
      expect(paramMap.test3).toBeUndefined();
    });

    it('should ignore the hash param in param map', () => {
      const url = 'http://example.com/test?test1=val1&test2=val2#HASHPARAM?test3=val3&test4';
      const paramMap = service.getUrlParamMap(url);
      expect(paramMap.test1).toEqual('val1');
      expect(paramMap.test2).toEqual('val2');
      expect(paramMap.test3).toEqual('val3');
      expect(paramMap.test4).toEqual('');
      expect(paramMap.test5).toBeUndefined();
    });
  });

  describe('#getParamValue', () => {
    it('should return expected param values', () => {
      const url = 'http://example.com/test?test1=val1&test2=val2';
      expect(service.getUrlParamValue('test1', url)).toEqual('val1');
      expect(service.getUrlParamValue('test2', url)).toEqual('val2');
      expect(service.getUrlParamValue('test3', url)).toBeUndefined();
    });
  });

  describe('#getServletContext', () => {
    let url: string;
    it('should return expected values', () => {
      url = 'http://example.com/test?servletcontext=test';
      expect(service.getServletContext(url)).toEqual('test');
      url = 'http://example.com/test';
      expect(service.getServletContext(url)).toBeUndefined();
    });
  });

  describe('#getAppContext', () => {
    let url: string;
    it('should return expected values', () => {
      url = 'http://example.com/test?appcontext=test';
      expect(service.getAppContext(url)).toEqual('test');
      url = 'http://example.com/test';
      expect(service.getAppContext(url)).toBeUndefined();
      url = 'http://example.com/test?servletcontext=test';
      expect(service.getAppContext(url)).toEqual('test');
      url = 'http://example.com/test?servletcontext=test/ad';
      expect(service.getAppContext(url)).toEqual('test');
    });

    it('should ignore "awdServer" when servletCotext="awdServer/<blah>" (i.e. appContext will be not set)', () => {
      url = 'http://example.com/test?servletcontext=awdServer/ad';
      expect(service.getAppContext(url)).toBe(undefined);
    });
  });

  describe('#getSecurityContext', () => {
    let url: string;
    it('should return expected values', () => {
      url = 'http://example.com/test?securitycontext=test';
      expect(service.getSecurityContext(url)).toEqual('test');
      url = 'http://example.com/test';
      expect(service.getSecurityContext(url)).toEqual('awd');
      url = 'http://example.com/test?servletcontext=test';
      expect(service.getSecurityContext(url)).toEqual('awd');
      url = 'http://example.com/test?servletcontext=test/ad';
      expect(service.getSecurityContext(url)).toEqual('ad');
    });
  });

  describe('#getAwdRestBaseUrl', () => {
    let url: string;
    let expected: string;
    it('should return expected values', () => {
      url = 'http://example.com/test';
      expected = 'http://example.com/awdServer/awd/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
      url = 'http://localhost:4200';
      expected = 'http://localhost:4200/awdServer/awd/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
      url = 'http://example.com?appcontext=test';
      expected = 'http://example.com/test/awdServer/awd/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
      url = 'http://example.com?appcontext=test&securitycontext=ad';
      expected = 'http://example.com/test/awdServer/ad/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
      url = 'http://example.com?servletcontext=test';
      expected = 'http://example.com/test/awdServer/awd/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
      url = 'http://example.com?servletcontext=test/ad';
      expected = 'http://example.com/test/awdServer/ad/services/v1';
      expect(service.getAwdRestBaseUrl(url)).toEqual(expected);
    });
  });
});
