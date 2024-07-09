// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { prodUrls } from '../app/core/constants';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AwdUrlUtil } from '@awd-ng-lib/util';
import { Observable, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

const authenticateDevUser = (awdUrlUtil: AwdUrlUtil, httpClient: HttpClient): Observable<any> => {
  const baseRestUrlPath = awdUrlUtil.getAwdRestBaseUrl();
  const authenticateUrl = awdUrlUtil.getV2AuthenticateUrl();

  return httpClient.get(`${baseRestUrlPath}/system`, { observe: 'response' }).pipe(
    map((response: HttpResponse<any>) => {
      return response.headers.get('csrf_token');
    }),
    mergeMap((csrfToken: string) => {
      return httpClient.post(authenticateUrl, {}, {
        observe: 'response',
        headers: {
          csrf_token: csrfToken
        }
      });
    }),
    map((authResponse: HttpResponse<any>) => {
      localStorage.setItem('AWDJWTTOKEN', authResponse.headers.get('jwt_token'));
      localStorage.setItem('AWDJWTREFRESHTOKEN', authResponse.headers.get('jwt_refresh_token'));
      localStorage.setItem('AWDJWTTOKENEXPIRY', authResponse.headers.get('jwt_token_expiry'));
      return true;
    }),
    catchError(error => {
      console.error('Error while authenticating dev user.', error);
      return throwError(error);
    })
  );
}

export const environment = {
  production: false,
  authenticateDevUser: authenticateDevUser,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
