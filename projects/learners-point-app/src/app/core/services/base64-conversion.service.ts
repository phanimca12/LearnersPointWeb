import { Injectable } from '@angular/core';
import { AwdRestApiService } from 'projects/awd-ng-lib/rest/src/public-api';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { pipe } from 'rxjs/internal/util/pipe';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable({
	providedIn: 'root'
})
export class Base64ConversionService {

	constructor(private awdRestApi: AwdRestApiService,
		private notificationService: NotificationService) { }



	encodeStringToBase64(body: any): Observable<any> {
		return this.awdRestApi.resources.base64Resources.postStringEncode({
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
	decodeStringToBase64(body: any): Observable<any> {
		return this.awdRestApi.resources.base64Resources.postStringDecode({
			body,
			headers: { 'Content-Type': 'application/json' },
			responseType: 'text'
		})
			.pipe(
				map((response) => {
					return response;
				}),
				catchError(err => {
					this.notificationService.showError('Something went wrong,' + err);
					return err;
				})
			);
	}
	encodeURLToBase64(body: any): Observable<any> {
		return this.awdRestApi.resources.base64Resources.postUrlEncode({
			body,
			headers: { 'Content-Type': 'application/json' },
			responseType: 'text'
		})
			.pipe(
				map((response) => {
					return response;
				}),
				catchError(err => {
					this.notificationService.showError('Something went wrong,' + err);
					return err;
				})
			);
	}

	decodeURLToBase64(body: any): Observable<any> {
		return this.awdRestApi.resources.base64Resources.postUrldecode({
			body,
			headers: { 'Content-Type': 'application/json' },
			responseType: 'text'
		})
			.pipe(
				map((response) => {
					return response;
				}),
				catchError(err => {
					this.notificationService.showError('Something went wrong,' + err);
					return err;
				})
			);
	}

}