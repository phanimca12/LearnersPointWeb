import { Injectable } from '@angular/core';
import { FileData } from './../../shared/interfaces/FileData';
import { AwdRestApiService } from 'projects/awd-ng-lib/rest/src/public-api';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserData } from '../../shared/interfaces/IUserModel';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private awdRestApi: AwdRestApiService,
		private notificationService: NotificationService) { }

    reportIssue(files: File[],userData:IUserData): Observable<Blob> {
      const formData = new FormData();
      formData.append('model',JSON.stringify(userData));
      // Append each file to the formData
      files.forEach(file => {
        formData.append('files', file, file.name);
      });
      return this.awdRestApi.resources.emailResources.postReportIssue({
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
        responseType: 'blob'
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
