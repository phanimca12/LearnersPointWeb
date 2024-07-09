import { TestBed } from '@angular/core/testing';

import { AwdLanguageDetectService } from './awd-language-detect.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ENVIRONMENT_TOKEN } from './di';

describe('LanguagedetectService', () => {
  let mockHttp: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AwdLanguageDetectService;

  const mockLanguage = 'en-us,zh-cn';

  const httpStub = {
    get() {
      return of(mockLanguage);
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpStub },
        { provide: ENVIRONMENT_TOKEN, useValue: {} },
      ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AwdLanguageDetectService);
    mockHttp = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(AwdLanguageDetectService).toBeTruthy();
  });

  it('should retrieve language from the API VIA GET ', () => {
    const data = [{ user: 'dstsetup', userId: '123' }];
    localStorage.setItem('currentUser', JSON.stringify(data));
    spyOn(mockHttp, 'get').and.returnValue(of(mockLanguage));
    service.getLanguageList().subscribe((respStatus) => {});
    expect(mockHttp.get).toHaveBeenCalled();
  });
});
