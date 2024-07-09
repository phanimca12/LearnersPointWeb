import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ENVIRONMENT_TOKEN } from './di';
import { Environment } from './types';

@Injectable({
  providedIn: 'root',
})
export class AwdLanguageDetectService {
  defaultHeader: HttpHeaders;

  constructor(
    public httpClient: HttpClient,
    @Optional()
    @Inject(ENVIRONMENT_TOKEN)
    private readonly env: Environment | null
  ) {
    this.defaultHeader = new HttpHeaders().set('Accept', 'text/xml');
    this.defaultHeader = this.defaultHeader.append(
      'Content-Type',
      'application/xml'
    );
    this.defaultHeader = this.defaultHeader.append('gzip', 'deflate');
  }

  getLanguageList(): Observable<any> {
    return this.httpClient
      .get(this.env?.language, {
        headers: this.defaultHeader,
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          return '';
        })
      );
  }
}
