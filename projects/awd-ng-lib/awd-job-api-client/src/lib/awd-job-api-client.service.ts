import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AwdSessionService, CSRF_TOKEN_NAME } from '@awd-ng-lib/session';
import { AwdUrlUtil } from '@awd-ng-lib/util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AwdJobApiClientParserService } from './awd-job-api-client-parser.service';
import { JOBS } from './awd-job-api-client.jobs';
import { IAwdJobApiClientFunctions } from './models/awd-job-api-client-functions.model';
import { IAwdJobApiClientFunction } from './models/awd-job-api-client.model';


const buildJobApiUrl = (baseUrlPath: string, jobName: string): string => {
  const generateUrlPath = baseUrlPath;
  const generatedQueryStr = `jobname=${jobName}`;
  return generateUrlPath + '?' + generatedQueryStr;
};

const BASE_HTTP_HEADERS: any = {
  'Content-Type': 'application/xml',
  'Accept': 'text/xml',
  // responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root',
})
export class AwdJobApiClientService {

  private baseUrl: string;
  public jobs: IAwdJobApiClientFunctions;

  constructor(
    private awdUrlUtil: AwdUrlUtil,
    private http: HttpClient,
    private awdSession: AwdSessionService,
    private parser: AwdJobApiClientParserService) {
    // TODO: get this from awdUrlUtil
    this.baseUrl = '/awdServer/awd/portal';
    this.jobs = this.generateJobApiFunctions(JOBS);
  }

  private generateJobApiFunctions(jobs): IAwdJobApiClientFunctions {
    const jobFunctions = {};
    Object.keys(jobs).forEach((jobName: any) => {
      const jobDef = jobs[jobName];
      jobFunctions[jobDef.alias] = this.httpFunctionFactory(jobName);
    });
    return jobFunctions as IAwdJobApiClientFunctions;
  }

  private httpFunctionFactory(jobName: string): IAwdJobApiClientFunction {
    return (requestXml: string): Observable<any> => {
      const url = buildJobApiUrl(this.baseUrl, jobName);
      const httpRequestOptions = {
        headers: { ...BASE_HTTP_HEADERS },
        body: requestXml,
        responseType: 'text' as 'text'
      };
      const csrfToken = this.awdSession.getCsrfToken();
      if (csrfToken) {
        httpRequestOptions.headers[CSRF_TOKEN_NAME] = csrfToken;
      }
      return this.http.request('POST', url, httpRequestOptions).pipe(
        map((xmlResponse: string) => {
          return this.parser.parse(jobName, xmlResponse);
        })
      );
    }
  }
}

