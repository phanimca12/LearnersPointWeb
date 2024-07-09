import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AwdUrlUtil } from '@awd-ng-lib/util';
import { AwdSessionService } from '@awd-ng-lib/session';
import { AWD_REST_RESOURCES } from './awd-rest-api.resources';
import { IAwdRestApi } from './models/awd-rest-api.model';
import { HttpMethods, IAwdRestOptions, IAwdRestResources } from './models/awd-rest.model';
import { CSRF_TOKEN_NAME } from '@awd-ng-lib/session';

const BASE_HTTP_HEADERS = {
  'Content-Type': 'application/json'
};

const capitalize = (s: string) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const buildRestUrl = (baseUrl: string, urlTemplate: string, paramMap: object): string => {
  let generatedUrl: string;
  if (baseUrl.charAt(baseUrl.length - 1) !== '/') {
    generatedUrl = baseUrl + '/';
  } else {
    generatedUrl = baseUrl;
  }
  // replace all inline parameters from url template
  generatedUrl += urlTemplate.replace(/\{[^\}]*\}/g, (match) => {
    const paramName = match.substring(1, match.length - 1);
    if (paramName in paramMap) {
      return paramMap[paramName];
    } else {
      throw Error(`Missing rest url parameter value [${paramName}]`);
    }
  });
  // remaining parameters are turned into url query string
  const remainingParamNames = Object.keys(paramMap).filter((paramName) => !urlTemplate.includes(`{${paramName}}`));
  const generatedQueryString = remainingParamNames.map((paramName) => `${paramName}=${paramMap[paramName]}`).join('&');
  if (generatedQueryString) {
    if (generatedUrl.includes('?')) {
      generatedUrl += '&' + generatedQueryString;
    } else {
      generatedUrl += '?' + generatedQueryString;
    }
  }

  return generatedUrl;
};

@Injectable({
  providedIn: 'root'
})
export class AwdRestApiService {
  private baseUrlRestPath: string;
  private elasticSearchBaseUrlPath: string;
  private baseUrlTARestPath: string;
  private documentDeliveryBaseUrlPath: string;
  private mgmtConsoleBaseUrlPath: string;

  resources: IAwdRestApi;
  url: string;

  constructor(private awdUrlUtil: AwdUrlUtil, private http: HttpClient, private awdSession: AwdSessionService) {
    this.resources = this.generateRestFunctions(AWD_REST_RESOURCES);
    this.baseUrlRestPath = this.awdUrlUtil.getAwdRestBaseUrl();
    this.elasticSearchBaseUrlPath = this.awdUrlUtil.getElasticSearchBaseUrl();
    this.documentDeliveryBaseUrlPath = this.awdUrlUtil.getDocumentDeliveryBaseUrl();
    this.baseUrlTARestPath = this.awdUrlUtil.getAwdRestBaseTAUrl();
    this.mgmtConsoleBaseUrlPath = this.awdUrlUtil.getMgmtConsoleBaseUrl();
  }

  private generateRestFunctions(restResourceMap: IAwdRestResources): IAwdRestApi {
    const obj = {};
    Object.keys(restResourceMap).forEach((resourceArea) => {
      obj[resourceArea] = {};
      Object.keys(restResourceMap[resourceArea]).forEach((resourceItem) => {
        const restResourceDef = restResourceMap[resourceArea][resourceItem];
        restResourceDef.methods.forEach((method) => {
          obj[resourceArea][`${method.toLowerCase()}${capitalize(resourceItem)}`] = this.httpFunctionFactory(
            method,
            restResourceDef.urlTemplate,
            resourceArea
          );
        });
      });
    });
    return obj as IAwdRestApi;
  }

  private httpFunctionFactory(
    httpMethod: HttpMethods,
    urlTemplate: string,
    resourceArea: string
  ): (options: IAwdRestOptions) => Observable<any> {
    return (options: IAwdRestOptions = {}): Observable<any> => {
      let baseUrl = this.baseUrlRestPath;

      const isElasticSearch: boolean = resourceArea === 'elasticSearch';
      const isDocumentDelivery: boolean = resourceArea === 'documentDelivery';
      const isManagementConsole: boolean = resourceArea === 'managementConsole';

      if (isElasticSearch) {
        baseUrl = this.elasticSearchBaseUrlPath;
      } else if (isDocumentDelivery) {
        baseUrl = this.documentDeliveryBaseUrlPath;
      } else if (isManagementConsole) {
        baseUrl = this.mgmtConsoleBaseUrlPath;
      }

      const url = buildRestUrl(baseUrl, urlTemplate, options.paramMap ?? {});
      const csrfToken = this.awdSession.getCsrfToken();

      options.headers = { ...BASE_HTTP_HEADERS, ...options.headers };

      if (csrfToken) {
        options.headers[CSRF_TOKEN_NAME] = csrfToken;
      }

      if (isElasticSearch) {
        const jwtToken = this.awdSession.getJwtToken();
        if (jwtToken) {
          options.headers.Authorization = `Bearer ${jwtToken}`;
        }
      }

      // Content-Type in the Request Header should be removed so that browser
      // correctly finds the Content-Type and the boundary associated with it
      if (options?.body instanceof FormData) {
        delete options.headers['Content-Type'];
      }

      return this.http.request(httpMethod, url, options);
    };
  }

  public callRestApi(data): Observable<any> {
    const options: IAwdRestOptions = {};
    const csrfToken = this.awdSession.getCsrfToken();
    const method = data.method || 'GET';
    // let requestUri = data.uri;
    let requestUri = data.uri.replace(';', '&');

    if (requestUri.charAt(0) === '/') {
      requestUri = requestUri.slice(1);
    }

    this.url = buildRestUrl(this.baseUrlTARestPath, requestUri, options.paramMap ?? {});

    options.headers = { ...BASE_HTTP_HEADERS, ...options.headers };
    if (csrfToken) {
      options.headers[CSRF_TOKEN_NAME] = csrfToken;
    }

    if (options?.body instanceof FormData) {
      delete options.headers['Content-Type'];
    }

    return this.http.request(method, this.url, options);
  }
}
