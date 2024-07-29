import { objectModel } from '../../interfaces/IObjectModel';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import xmlFormat from 'xml-formatter';
import { XMLConversionService } from '../../../core/services/xmlconversion.service';
import { XmlConstants } from '../../constants/enums/xml-headers';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
	selector: 'app-generate-object-child',
	templateUrl: './generate-object-child.component.html',
	styleUrls: ['./generate-object-child.component.scss']
})
export class GenerateObjectChildComponent implements OnInit {
	@Input() childLabel: String;
	label: String = XmlConstants.GENERATE_JAVA_CLASS
	headerTitle: String = XmlConstants.XML_TO_JAVA_CLASS
	textareaValue: string = '';
	showResponse = false;
	responseData: string = '';
	getSubcription: Subscription;
	isDisabled: true;
	type: String = XmlConstants.XML_TO_JAVA_CLASS;
	jsonMode = 'application/ld+json';
	xmlMode = 'application/xml';
	mode: String = '';
	unescapedString: SafeHtml;
	csvFile: any = '';
	showTextArea = true;
	showFileUpload = false;
	showButton = true;
	tabs: objectModel[] = [];
	rating: number;
	objectList: objectModel[] = [
		{ objectName: '', objectDescription: '' }
	];
	dataList: objectModel[] = [];
	sanitizer: any;
	constructor(private xmlConversionService: XMLConversionService, sanitizer: DomSanitizer) { }

	ngOnInit(): void {
		this.headerTitle = XmlConstants.XML_TO_JAVA_CLASS;
		this.type = this.childLabel;
		this.isDisabled = true;
		this.responseData = '';
		this.textareaValue = '';
		this.mode = 'application/xml'
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.childLabel.currentValue) {
			this.headerTitle = this.getHeaders().get(changes.childLabel.currentValue);
			this.label = this.getLabels().get(changes.childLabel.currentValue);
			this.mode = this.getFileModes().get(changes.childLabel.currentValue);
			this.showFileUpload = false;
			this.showTextArea = true;
			this.showButton = true;
			this.showResponse = false;
			this.responseData = '';
			this.textareaValue = '';
			this.type = changes.childLabel.currentValue;
			this.csvFile = '';
			setTimeout(() => { }, 0);
			this.rating = null;
		}
	}



	processRequest(type, payload) {
		this.dataList = [];
		if (this.getSubcription) {
			this.getSubcription.unsubscribe();
		}
		this.getSubcription = this.getObservableOfResponse(type, payload).subscribe(res => {
			this.dataList = res;
		}
		);
		this.showResponse = true;
		this.textareaValue = '';
		setTimeout(() => { }, 0);
	}
	escapedString(escapedString: any) {
		throw new Error('Method not implemented.');
	}
	getResponse() {
		const payload =
		{
			"requestData": this.textareaValue
		}
		if (payload.requestData)
			this.processRequest(this.type, payload);
	}
	getObservableOfResponse(type, body): Observable<any> {
		if (body) {
			type = !type ? XmlConstants.XML_TO_JAVA_CLASS : type;
			return this.xmlConversionService[`${this.getApi().get(this.type)}`](body);
		}
	}

	getRating(event) {
		console.log(event.value);
		this.rating = event.value;
	}

	getHeaders() {
		return new Map<String, String>([
			[XmlConstants.XML_TO_JAVA_CLASS, XmlConstants.XML_TO_JAVA_CLASS],
			[XmlConstants.JSON_TO_JAVA_CLASS, XmlConstants.JSON_TO_JAVA_CLASS],

		]);
	}
	getLabels() {
		return new Map<String, String>([
			[XmlConstants.XML_TO_JAVA_CLASS, XmlConstants.GENERATE_JAVA_CLASS],
			[XmlConstants.JSON_TO_JAVA_CLASS, XmlConstants.GENERATE_JAVA_CLASS],

		]);
	}

	getFileModes() {
		return new Map<String, String>([
			[XmlConstants.XML_TO_JAVA_CLASS, 'application/xml'],
			[XmlConstants.XML_TO_JAVA_CLASS, 'application/ld+json'],

		]);
	}
	getApi() {
		return new Map<String, String>([
			[XmlConstants.XML_TO_JAVA_CLASS, 'convertXmlToClass'],
			[XmlConstants.XML_TO_JAVA_CLASS, 'convertJSONToClass'],
		]);
	}
}
