import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, concatMap, map, take, tap } from 'rxjs/operators';

import { AwdUrlUtil, AwdWindowUtil } from '@awd-ng-lib/util';

export const CSRF_TOKEN_NAME = 'csrf_token';
export const JWTTOKEN = 'jwt_token';
export const JWTREFRESHTOKEN = 'jwt_refresh_token';
export const JWTTOKENEXPIRY = 'jwt_token_expiry';
export const AWDJWTTOKEN = 'AWDJWTTOKEN';
export const AWDJWTREFRESHTOKEN = 'AWDJWTREFRESHTOKEN';
export const AWDJWTTOKENEXPIRY = 'AWDJWTTOKENEXPIRY';

@Injectable({
  providedIn: 'root',
})
export class AwdSessionService implements OnDestroy {
  private baseRestUrlPath: string;
  private jwtAccessTokenRefreshUrl: string;
  private csrfToken: string;
  private jwtToken: string;
  private jwtRefreshToken: string;
  private _jwtTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  readonly jwtToken$ = this._jwtTokenSubject.asObservable();
  private sessionTimeout: number;
  private windowRef = this.awdWindowUtil.getBrowserWindow();
  private uxBuilderHostUrl: string;
  private jwtEnabled: boolean;
  private subs: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private awdUrlUtil: AwdUrlUtil,
    private awdWindowUtil: AwdWindowUtil
  ) {
    this.baseRestUrlPath = this.awdUrlUtil.getAwdRestBaseUrl();
    this.jwtAccessTokenRefreshUrl = this.awdUrlUtil.getJwtAccessTokenRefreshUrl();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public initialize(setupJwtRefreshInterval: boolean = false) {
    const systemRestApiPath = `${this.baseRestUrlPath}/system`;
    return this.http.get(systemRestApiPath, { observe: 'response' }).pipe(
      concatMap((response: any) => {
        this.sessionTimeout = parseInt(response.body.sessionTimeout);
        this.csrfToken = response.headers.get(CSRF_TOKEN_NAME);
        this.uxBuilderHostUrl = response.body.uxBuilderHostUrl;
        this.jwtEnabled = response.body.jwtEnabled;
        if (this.jwtEnabled) {
          return this.initJwtToken(setupJwtRefreshInterval);
        } else {
          return of({}).pipe(take(1));
        }
      })
    );
  }

  createSession(userDetails) {
    return this.http.post(this.awdUrlUtil.getV2AuthenticateUrl(), {}, {
      headers: {
        'Authorization': `AWD ${btoa(`${userDetails.userId}:${userDetails.password}`)}`
      }, observe: 'response'
    }).pipe(
      map((authResponse: HttpResponse<any>) => {
        if (authResponse.headers.get(JWTTOKEN))
          localStorage.setItem(AWDJWTTOKEN, authResponse.headers.get(JWTTOKEN));
        if (authResponse.headers.get(JWTREFRESHTOKEN))
          localStorage.setItem(AWDJWTREFRESHTOKEN, authResponse.headers.get(JWTREFRESHTOKEN));
        if (authResponse.headers.get(JWTTOKENEXPIRY))
          localStorage.setItem(AWDJWTTOKENEXPIRY, authResponse.headers.get(JWTTOKENEXPIRY));
        return authResponse;
      }),
      catchError(error => {
        console.error('Error while authenticating dev user.', error);
        return throwError(error);
      })
    );
  }

  public getCsrfToken() {
    return this.csrfToken;
  }

  public getJwtToken() {
    return this.jwtToken ?? '';
  }

  public getJwtTokenObservable(): Observable<string> {
    return this.jwtToken$;
  }

  public getSessionTimeout() {
    return this.sessionTimeout;
  }

  public getUxBuilderHostUrl() {
    return this.uxBuilderHostUrl ?? '';
  }

  public redirectToLogin(workspace?) {
    this.windowRef.location.href = this.getLoginUrl(workspace);
  }

  private getLoginUrl(workspace?): string {
    const currentUrl = this.awdUrlUtil.getCurrentUrl();
    let url = currentUrl.slice(0, currentUrl.indexOf('/awd/')) + '/awd/portal/login.html';
    if (currentUrl.includes('?')) {
      const paramMap = this.awdUrlUtil.getUrlParamMap();
      url += '?' + Object.keys(paramMap).map(paramName => `${paramName}=${paramMap[paramName]}`).join('&');
    }
    if (workspace && !url.includes('workspaceTarget')) {
      url += (url.includes('?') ? `&workspaceTarget=${workspace}` : `?workspaceTarget=${workspace}`);
    }
    return url;
  }

  private initJwtToken(setupJwtRefreshInterval: boolean = false): Observable<any> {
    // Get JWT refresh token from local storage, which should be set by the login page
    this.jwtRefreshToken = localStorage.getItem("AWDJWTREFRESHTOKEN");

    // Refresh to fetch JWT token and expiry (using JWT refresh token) since the one in local storage may be stale
    return this.fetchJwtToken().pipe(
      tap(response => {
        const jwtTokenExpiry = response.headers.get("jwt_token_expiry");
        if (setupJwtRefreshInterval) {
          this.setupJwtRefreshInterval(jwtTokenExpiry);
        }
      })
    );
  }

  private setupJwtRefreshInterval(jwtTokenExpiry: string): void {
    // Default is 15 minutes for expiry. Refresh 1 minute earlier than expiry
    if (this.jwtRefreshToken) {
      let refreshIntervalInMinutes = jwtTokenExpiry ? Number(jwtTokenExpiry) : 15;
      refreshIntervalInMinutes = refreshIntervalInMinutes > 1 ? refreshIntervalInMinutes - 1 : refreshIntervalInMinutes;
      this.subs.push(
        interval(refreshIntervalInMinutes * 60 * 1000).subscribe(_x => {
          this.fetchJwtToken().subscribe();
        })
      );
    }
  }

  fetchJwtToken(): Observable<any> {
    return this.http.post(this.jwtAccessTokenRefreshUrl, {}, {
      headers: {
        Authorization: 'Bearer ' + this.jwtRefreshToken
      }, observe: 'response'
    }).pipe(
      map(authResponse => {
        this.updateJwtToken(authResponse.headers.get("jwt_token"));
        return authResponse;
      })
    );
  }

  private updateJwtToken(newJwtToken): void {
    this.jwtToken = newJwtToken;
    this._jwtTokenSubject.next(newJwtToken);
    localStorage.setItem("AWDJWTTOKEN", newJwtToken);
  }

  public updateCsrfToken(token: string): void {
    this.csrfToken = token;
  }
}
