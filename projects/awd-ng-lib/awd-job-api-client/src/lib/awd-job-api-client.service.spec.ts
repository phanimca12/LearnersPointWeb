import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AwdSessionService } from '@awd-ng-lib/session';
import { AwdUrlUtil } from '@awd-ng-lib/util';

import { AwdJobApiClientService } from './awd-job-api-client.service';
import { AwdJobApiClientParserService } from './awd-job-api-client-parser.service';

const BASE_JOB_API_PATH = '/awdServer/awd/portal';

describe('AwdJobApiClientService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AwdJobApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AwdJobApiClientService,
        HttpClient,
        {
          provide: AwdUrlUtil,
          useValue: {
            getAwdRestBaseUrl: () => {
              return BASE_JOB_API_PATH;
            },
            getAwdJobApiBaseUrl: () => {
              return BASE_JOB_API_PATH;
            },
          },
        },
        {
          provide: AwdSessionService,
          useValue: {
            getCsrfToken: () => {
              return 'TEST_TOKEN';
            }
          },
        },
        {
          provide: AwdJobApiClientParserService,
          useValue: {
            parse: () => {
              return {};
            }
          }
        }
      ],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(AwdJobApiClientService);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  })

  describe('smoke tests', () => {
    it('service should initialize', () => {
      expect(service).toBeTruthy();
      expect(service.jobs).toBeTruthy();
      expect(Object.keys(service.jobs).length).toBeGreaterThan(0);
    });
  });

  describe('#jobs.getUserScreenDefinition', () => {
    it('should call expected URL', (done: DoneFn) => {
      const testResponse = '<xml>test</xml>';
      service.jobs.getUserScreenDefinition('XML_REQUEST').subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
      const req = httpTestingController.expectOne(`${BASE_JOB_API_PATH}?jobname=tcAJAXGetUserScreenDefinition`);
      req.flush(testResponse);
    });
  });

  describe('#jobs.getUserScreens', () => {
    it('should call expected URL', (done: DoneFn) => {
      const testResponse = '<xml>test</xml>';
      service.jobs.getUserScreens('XML_REQUEST').subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
      const req = httpTestingController.expectOne(`${BASE_JOB_API_PATH}?jobname=tcAJAXGetUserScreenNames`);
      req.flush(testResponse);
    })
  });

  describe('#jobs.saveUserScreenDefinition', () => {
    it('should call expected URL', (done: DoneFn) => {
      const testResponse = '<xml>test</xml>';
      service.jobs.saveUserScreenDefinition('XML_REQUEST').subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
      const req = httpTestingController.expectOne(`${BASE_JOB_API_PATH}?jobname=tcAJAXSaveUserScreenDefinition`);
      req.flush(testResponse);
    })
  });


});
