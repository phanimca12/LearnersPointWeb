import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IAwdRestConfig {
  baseRestPath: string;
  csrfToken: string;
}

// Follows the interface of @angular/common/http/HttpClient request options with params replaced with paramMap
export interface IAwdRestOptions {
  body?: any;
  headers?:
  | HttpHeaders
  | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'events' | 'response';
  // For building rest url based on our template
  paramMap?: any;
  // Taken by @angular/common/http/HttpClient request
  // params?: HttpParams | {
  //   [param: string]: string | string[];
  // };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
  withCredentials?: boolean;
}

export interface IRestApiFunction {
  (options?: IAwdRestOptions): Observable<any>;
}

export interface IRestDef {
  urlTemplate: string;
  methods: HttpMethods[];
}

export interface IAwdRestResources {
  [functionGroup: string]: {
    [functionName: string]: IRestDef;
  };
}

export interface IAwdLink {
  href: string;
  rel: string;
  type: string;
}
