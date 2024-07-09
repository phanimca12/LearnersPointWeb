import { Observable } from "rxjs";

export interface IAwdJobApiClientFunction {
  (requestXml: string): Observable<any>;
}