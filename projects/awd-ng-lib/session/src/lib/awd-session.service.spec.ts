import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AwdUrlUtil } from '@awd-ng-lib/util';
import { AwdWindowUtil } from '@awd-ng-lib/util';

import { AwdSessionService } from './awd-session.service';

describe('AwdSessionService', () => {
  let service: AwdSessionService;
  let httpTestingController: HttpTestingController;
  let awdUrlUtil: AwdUrlUtil;
  let awdWindowUtil: AwdWindowUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AwdSessionService);
    httpTestingController = TestBed.inject(HttpTestingController);
    awdUrlUtil = TestBed.inject(AwdUrlUtil);
    awdWindowUtil = TestBed.inject(AwdWindowUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('#redirectToLogin', () => {
  //   it('should set the window href to the login href', () => {
  //     const mockWindowObject = {
  //       location: {
  //         href: '',
  //       },
  //     };
  //     spyOn(awdWindowUtil, 'getBrowserWindow').and.returnValue(mockWindowObject as Window);

  //     service.redirectToLogin();

  //     expect(mockWindowObject.location.href).toEqual(awdUrlUtil.getLoginHref());
  //   });
  // });
});
