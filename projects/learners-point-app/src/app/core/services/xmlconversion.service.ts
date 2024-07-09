import { Injectable } from '@angular/core';
import { AwdRestApiService } from 'projects/awd-ng-lib/rest/src/public-api';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { objectModel } from '../../shared/interfaces/IObjectModel';


@Injectable({
  providedIn: 'root'
})
export class XMLConversionService {

  constructor(private awdRestApi: AwdRestApiService,
		private notificationService: NotificationService) { }

convertXmlToXsd(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertXmlToXsd({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}
convertXmlToJson(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertXmlToJson({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}

convertJsonToXml(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertJsonToXml({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}

convertJsonToYaml(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertJsonToYaml({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}

convertYamlToJson(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertYamlToJson({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}

convertCsvToXml(body: any): Observable<any> {
  const formData = new FormData();
    formData.append('file', body);
    
  return this.awdRestApi.resources.xmlConversionResources.postConvertCsvToXml({
    body:formData,
    headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}
convertCsvToJson(body: any): Observable<any> {
  const formData = new FormData();
    formData.append('file', body);
    
  return this.awdRestApi.resources.xmlConversionResources.postConvertCvtToJson({
    body:formData,
    headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
    responseType: 'text'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}
convertXmlToClass(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertXmlToClass({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'json'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}
convertJSONToClass(body: any): Observable<any> {
  return this.awdRestApi.resources.xmlConversionResources.postConvertJSONToClass({
    body,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseType: 'json'
  })
    .pipe(
      map((response) => {
        return response;
      }
      ),
      catchError(err => {
        this.notificationService.showError('Something went wrong,' + err);
        return err;
      })
    );
}
}