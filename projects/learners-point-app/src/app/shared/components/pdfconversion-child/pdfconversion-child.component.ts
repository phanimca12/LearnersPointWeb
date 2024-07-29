import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { PdfconversionService } from '../../../core/services/pdfconversion.service';
import { Observable } from 'rxjs/internal/Observable';
import { PdfConstants } from '../../constants/enums/pdfconversion-headers';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';

@Component({
	selector: 'app-pdfconversion-child',
	templateUrl: './pdfconversion-child.component.html',
	styleUrls: ['./pdfconversion-child.component.scss']
})



export class PDFConversionChildComponent implements OnInit {
	@ViewChild('fileUpload') fileUpload: FileUpload;

	type: String = PdfConstants.JPG_TO_PDF;
	getSubcription: Subscription;
	uploadedWordFiles: File[] = [];
	@Input() childLabel: String;
	acceptedFiles: String = "image/*.jpeg";
	headerTitle: String = PdfConstants.JPG_TO_PDF_HEADER
	subTitle: String = PdfConstants.JPEG_TO_PDF_SUB_HEADER
	showSpinner: boolean = false;


	constructor(private messageService: MessageService, private pdfConversion: PdfconversionService, public dialogService: DialogService) { }

	ngOnInit(): void {
		this.type = !this.childLabel ? PdfConstants.JPG_TO_PDF : this.childLabel;
		this.headerTitle = PdfConstants.JPG_TO_PDF_HEADER;
		this.subTitle = PdfConstants.JPEG_TO_PDF_SUB_HEADER;
		this.acceptedFiles = "image/*.jpeg";
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.childLabel.currentValue) {
			this.headerTitle = this.getHeaders().get(changes.childLabel.currentValue);
			this.subTitle = this.getSubHeaders().get(changes.childLabel.currentValue);
			this.type = changes.childLabel.currentValue;
			this.acceptedFiles = this.getAcceptedFileTypes().get(changes.childLabel.currentValue);
			setTimeout(() => { }, 0);
		}
	}

	uploadFile(event) {
		this.uploadedWordFiles = [];
		for (let file of event.files) {
			if (file.type === this.getFileTypes().get(this.type))
				this.uploadedWordFiles.push(file);
		}
		if (this.uploadedWordFiles.length > 6)
			this.showFileExceedErr();
		else {
			this.uploadedWordFiles.length > 1 ? this.processRequest(this.type, this.uploadedWordFiles, 'zip') : this.processRequest(this.type, this.uploadedWordFiles, this.getDownloadFileTypes().get(this.type));
			this.fileUpload.clear();
		}
	}

	showFileExceedErr() {
		setTimeout(() => {
			this.messageService.add({
				severity: "error",
				summary: "Error Message",
				detail: "Maximum files uploaded limit of 6 exceed !"
			});
		}, 1000);
	}
	onFileCancel() {
		this.uploadedWordFiles = [];
		setTimeout(() => { }, 0);
	}

	processRequest(type, payload, downloadType) {
		if (this.getSubcription) {
			this.getSubcription.unsubscribe();
		}
		this.getSubcription = this.getObservableOfResponse(type, payload).subscribe(res => {
			this.performDownload(res, downloadType);
		});
	}

	performDownload(res: Blob, downloadType) {
		const downloadUrl = window.URL.createObjectURL(res);
		this.showSpinner = true;
		setTimeout(() => {
			this.showSpinner = false;
			if (downloadUrl) {
				const a = document.createElement('a');
				a.href = downloadUrl;
				a.download = 'learnerspoint.' + downloadType; // Replace with the desired file name
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				window.URL.revokeObjectURL(downloadUrl);
				this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
			}
		}, 3000);

	}
	getObservableOfResponse(type, body): Observable<Blob> {
		if (body) {
			type = !type ? PdfConstants.JPG_TO_PDF : type;
			return this.pdfConversion[`${this.getApi().get(this.type)}`](body);

		}
	}

	getFileTypes() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
			[PdfConstants.JPG_TO_PDF, "image/jpeg"],
			[PdfConstants.HTML_TO_PDF, "text/html"],
			[PdfConstants.EXCEL_TO_PDF, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
			[PdfConstants.POWERPOINT_TO_PDF, "application/vnd.ms-powerpoint"],
			[PdfConstants.PDF_TO_WORD, "application/pdf"],
			[PdfConstants.PDF_TO_JPG, "application/pdf"],
			[PdfConstants.PDF_TO_EXCEL, "application/pdf"],
			[PdfConstants.PDF_TO_POWERPOINT, "application/pdf"]
		]);
	}

	getDownloadFileTypes() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, "pdf"],
			[PdfConstants.JPG_TO_PDF, "pdf"],
			[PdfConstants.HTML_TO_PDF, "pdf"],
			[PdfConstants.EXCEL_TO_PDF, "pdf"],
			[PdfConstants.POWERPOINT_TO_PDF, "pdf"],
			[PdfConstants.PDF_TO_WORD, "docx"],
			[PdfConstants.PDF_TO_JPG, "jpg"],
			[PdfConstants.PDF_TO_EXCEL, "xlsx"],
			[PdfConstants.PDF_TO_POWERPOINT, "pptx"]
		]);
	}

	getApi() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, 'convertWordToPdf'],
			[PdfConstants.JPG_TO_PDF, "convertJpegToPdf"],
			[PdfConstants.HTML_TO_PDF, "convertHtmlToPdf"],
			[PdfConstants.EXCEL_TO_PDF, "convertExcelToPdf"],
			[PdfConstants.POWERPOINT_TO_PDF, "convertPowerPointToPdf"],
			[PdfConstants.PDF_TO_WORD, "convertPDFToWord"],
			[PdfConstants.PDF_TO_JPG, "convertPDFToJpg"],
			[PdfConstants.PDF_TO_EXCEL, "convertPDFToExcel"],
			[PdfConstants.PDF_TO_POWERPOINT, "convertPDFToPpt"]
		]);
	}
	getHeaders() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, PdfConstants.WORD_TO_PDF_HEADER],
			[PdfConstants.JPG_TO_PDF, PdfConstants.JPG_TO_PDF_HEADER],
			[PdfConstants.HTML_TO_PDF, PdfConstants.HTML_TO_PDF_HEADER],
			[PdfConstants.EXCEL_TO_PDF, PdfConstants.EXCEL_TO_PDF_HEADER],
			[PdfConstants.POWERPOINT_TO_PDF, PdfConstants.POWERPOINT_TO_PDF_HEADER],
			[PdfConstants.PDF_TO_JPG, PdfConstants.PDF_TO_JPG_HEADER],
			[PdfConstants.PDF_TO_WORD, PdfConstants.PDF_TO_WORD_HEADER],
			[PdfConstants.PDF_TO_POWERPOINT, PdfConstants.PDF_TO_POWERPOINT_HEADER],
			[PdfConstants.PDF_TO_EXCEL, PdfConstants.PDF_TO_EXCEL_HEADER],
		]);
	}
	getSubHeaders() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, PdfConstants.WORD_TO_PDF_SUB_HEADER],
			[PdfConstants.JPG_TO_PDF, PdfConstants.JPEG_TO_PDF_SUB_HEADER],
			[PdfConstants.HTML_TO_PDF, PdfConstants.HTML_TO_PDF_SUB_HEADER],
			[PdfConstants.EXCEL_TO_PDF, PdfConstants.EXCEL_TO_PDF_SUB_HEADER],
			[PdfConstants.POWERPOINT_TO_PDF, PdfConstants.POWERPOINT_TO_PDF_SUB_HEADER],
			[PdfConstants.PDF_TO_JPG, PdfConstants.PDF_TO_JPG_SUB_HEADER],
			[PdfConstants.PDF_TO_WORD, PdfConstants.PDF_TO_WORD_SUB_HEADER],
			[PdfConstants.PDF_TO_POWERPOINT, PdfConstants.PDF_TO_POWERPOINT_SUB_HEADER],
			[PdfConstants.PDF_TO_EXCEL, PdfConstants.PDF_TO_EXCEL_SUB_HEADER],
		]);
	}
	getAcceptedFileTypes() {
		return new Map<String, String>([
			[PdfConstants.WORD_TO_PDF, ".doc,.docx"],
			[PdfConstants.JPG_TO_PDF, "image/jpeg"],
			[PdfConstants.HTML_TO_PDF, ".html"],
			[PdfConstants.EXCEL_TO_PDF, ".xls,.xlsx"],
			[PdfConstants.POWERPOINT_TO_PDF, ".ppt,.pptx,.pps,.ppsx"],
			[PdfConstants.PDF_TO_JPG, ".pdf"],
			[PdfConstants.PDF_TO_WORD, ".pdf"],
			[PdfConstants.PDF_TO_POWERPOINT,".pdf"],
			[PdfConstants.PDF_TO_EXCEL, ".pdf"],
		]);
	}
}
