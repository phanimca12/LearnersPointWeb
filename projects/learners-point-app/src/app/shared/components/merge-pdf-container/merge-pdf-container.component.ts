import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FileData } from '../../interfaces/FileData';
import { PdfconversionService } from '../../../core/services/pdfconversion.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { MessageService } from 'primeng/api';
import {ProgressBarModule} from 'primeng/progressbar';

@Component({
	selector: 'app-merge-pdf-container',
	templateUrl: './merge-pdf-container.component.html',
	styleUrls: ['./merge-pdf-container.component.scss']
})
export class MergePdfContainerComponent implements OnInit {

	filesData: FileData[] = []; // Array to hold file data
	showMerge = false;
	showProgress=false;
	getSubcription: Subscription;
	constructor(private pdfConversion: PdfconversionService, private messageService: MessageService,) { }

	ngOnInit(): void {
		this.showMerge = false;
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			this.showMerge = true;
			setTimeout(() => { }, 0);
		}
	}
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.filesData, event.previousIndex, event.currentIndex);
	}

	onFileSelected(event: Event): void {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			this.showMerge = true;
			setTimeout(() => { }, 0);
			Array.from(fileInput.files).forEach((file) => {
				const reader = new FileReader();
				reader.onload = (e: any) => {
						this.filesData.push({
						arrayBuffer: e.target.result,
						file: file
					});
				};
				reader.readAsArrayBuffer(file);
			});
		}
		setTimeout(() => { }, 0);
	}
	removeItem(index: number) {
		this.showMerge = true;
		setTimeout(() => { }, 0);
		this.filesData.splice(index, 1);
		if (!this.filesData.length) {
			this.showMerge = false;
			setTimeout(() => { }, 0);
		}
	}
	processRequest( payload, downloadType) {
		if (this.getSubcription) {
			this.getSubcription.unsubscribe();
		}
		this.getSubcription = this.getObservableOfResponse(payload).subscribe(res => {
			this.performDownload(res, downloadType);
		});
	}
	getObservableOfResponse( body): Observable<Blob> {
		if (body) {
			return this.pdfConversion.mergePDF(body);
		}
	}

	performDownload(res: Blob, downloadType) {
		const downloadUrl = window.URL.createObjectURL(res);
			setTimeout(() => {
				if (downloadUrl) {
				const a = document.createElement('a');
				a.href = downloadUrl;
				a.download = 'learnerspoint.' + downloadType; // Replace with the desired file name
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				window.URL.revokeObjectURL(downloadUrl);
				this.showProgress=false;
				this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
			}
		}, 2000);

	}
	mergePDF()
	{
		if (this.filesData.length) {
			this.showProgress=true;
			this.processRequest( this.filesData.map(fileData => fileData.file ), 'pdf')
			this.showMerge = false;
			this.filesData=[];
			setTimeout(() => { }, 0);
		}


	}
}
