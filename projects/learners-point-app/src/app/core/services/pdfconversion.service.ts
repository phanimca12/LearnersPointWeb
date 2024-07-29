import { FileData } from './../../shared/interfaces/FileData';
import { Injectable } from '@angular/core';
import { AwdRestApiService } from 'projects/awd-ng-lib/rest/src/public-api';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PdfconversionService {

	constructor(private awdRestApi: AwdRestApiService,
		private notificationService: NotificationService) { }


	convertWordToPdf(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
		
			formData.append('files', file ,file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertWordToPDF({
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
	convertJpegToPdf(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertJpegToPDF({
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

	convertHtmlToPdf(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertHtmlToPDF({
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
	convertExcelToPdf(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertExcelToPDF({
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

	convertPowerPointToPdf(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertPowerPointToPDF({
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

	convertPDFToWord(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertPDFToWord({
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

	convertPDFToJpg(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertPDFToJpg({
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
	convertPDFToPpt(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertPDFToPPT({
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

	convertPDFToExcel(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertPDFToExcel({
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

	mergePDF(files: File[]): Observable<Blob> {
		const formData = new FormData();
		// Append each file to the formData
		files.forEach(file => {
			formData.append('files', file, file.name);
		});
		return this.awdRestApi.resources.pdfConversionResources.postConvertMergePDF({
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
