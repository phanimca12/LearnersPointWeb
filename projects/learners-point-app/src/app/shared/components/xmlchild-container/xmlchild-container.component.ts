import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Base64Headers } from '../../constants/enums/base64-headers';
import { XmlConstants } from '../../constants/enums/xml-headers';
import { Observable, Subscription } from 'rxjs';
import { XMLConversionService } from '../../../core/services/xmlconversion.service';
import xmlFormat from 'xml-formatter';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { ClipboardService } from 'ngx-clipboard'
import { FileUpload } from 'primeng/fileupload';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-xmlchild-container',
	templateUrl: './xmlchild-container.component.html',
	styleUrls: ['./xmlchild-container.component.scss']
})
export class XmlchildContainerComponent implements OnInit {
	@ViewChild('fileUpload') fileUpload: FileUpload;
	
	@ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;
	@Input() childLabel: String;
	label: String = this.translateService.instant('CONVERTERS_TAB.GENERATE_XSD'); 
	headerTitle: String =this.translateService.instant('CONVERTERS_TAB.XSD_SCHEMA_GENERATOR'); 
	textareaValue: string = '';
	showResponse = false;
	responseData: string = '';
	getSubcription: Subscription;
	isDisabled: true;
	type: String = XmlConstants.XSD_GENERATOR;
	mode: String = '';
	rating: number;
	csvFile: any = '';
	showTextArea = true;
	showFileUpload = false;
	showButton = true;
	acceptedFiles: String = ".csv,.xls,.xlsx";

	constructor(private xmlConversionService: XMLConversionService, private clipboardService: ClipboardService,private translateService: TranslateService) { }

	ngOnInit(): void {
		this.headerTitle =this.translateService.instant('CONVERTERS_TAB.XSD_SCHEMA_GENERATOR'); 
		this.type = this.childLabel;
		this.isDisabled = true;
		this.responseData = '';
		this.textareaValue = '';
		this.mode = 'application/xml'
		this.showFileUpload = false;
		this.showResponse = false;
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.childLabel.currentValue) {
			let isFileUpload = changes.childLabel.currentValue === XmlConstants.CSV_TO_XML_CONVERTER || changes.childLabel.currentValue === XmlConstants.CSV_TO_JSON_CONVERTER;
			this.headerTitle = this.getHeaders().get(changes.childLabel.currentValue);
			this.label = this.getLabels().get(changes.childLabel.currentValue);
			this.mode = this.getFileModes().get(changes.childLabel.currentValue);
			this.showFileUpload = isFileUpload ? true : false;
			this.showTextArea = !isFileUpload ? true : false;
			this.showButton = !isFileUpload ? true : false;
			this.showResponse = false;
			this.responseData = '';
			this.textareaValue = '';
			this.type = changes.childLabel.currentValue;
			this.csvFile = '';
			this.rating = null;
			setTimeout(() => { }, 0);

		}
	}

	processRequest(type, payload) {
		if (this.getSubcription) {
			this.getSubcription.unsubscribe();
		}
		this.getSubcription = this.getObservableOfResponse(type, payload).subscribe(res => {
			this.responseData = this.mode === 'application/xml' ? xmlFormat(res) : res;
		}
		);
		this.showResponse = true;
		this.textareaValue = '';
		setTimeout(() => { }, 0);
	}

	getResponse() {
		const payload =
		{
			"requestData": this.textareaValue
		}
		this.processRequest(this.type, payload);
	}

	getObservableOfResponse(type, body): Observable<string> {
		if (body) {
			type = !type ? XmlConstants.XSD_GENERATOR : type;
			return this.xmlConversionService[`${this.getApi().get(this.type)}`](body);
		}
	}

	uploadFile(event) {
		for (let file of event.files) {
			if (file.type === 'text/csv')
				this.csvFile = file;
		}
		if (this.csvFile)
			this.processRequest(this.type, this.csvFile);
	}

	getRating(event) {
		console.log(event.value);
		this.rating = event.value;
	}

	copyText() {
		const codeMirrorInstance = this.codeMirrorComponent.codeMirror;
		codeMirrorInstance.execCommand('selectAll');
		const selectedText = this.codeMirrorComponent.codeMirror.getSelection();
		if (selectedText) {
			this.clipboardService.copyFromContent(selectedText);
			alert("Text Copied !")
		}
	}

	getHeaders() {
		return new Map<String, String>([
			[this.translateService.instant('CONVERTERS_TAB.XSD_GENERATOR'), this.translateService.instant('CONVERTERS_TAB.XSD_SCHEMA_GENERATOR')],
			[this.translateService.instant('CONVERTERS_TAB.XML_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.XML_JSON_CONVERTER')],
			[this.translateService.instant('CONVERTERS_TAB.JSON_XML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.JSON_XML_CONVERTER')],
			[this.translateService.instant('CONVERTERS_TAB.JSON_YAML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.JSON_YAML_CONVERTER')],
			[this.translateService.instant('CONVERTERS_TAB.YAML_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.YAML_JSON_CONVERTER')],
			[this.translateService.instant('CONVERTERS_TAB.CSV_XML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CSV_XML_CONVERTER')],
			[this.translateService.instant('CONVERTERS_TAB.CSV_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CSV_JSON_CONVERTER')],
		]);
	}
	getLabels() {
		return new Map<String, String>([
			[this.translateService.instant('CONVERTERS_TAB.XSD_GENERATOR'), this.translateService.instant('CONVERTERS_TAB.GENERATE_XSD')],
			[this.translateService.instant('CONVERTERS_TAB.XML_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_XML_TO_JSON')],
			[this.translateService.instant('CONVERTERS_TAB.JSON_XML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_JSON_TO_XML')],
			[this.translateService.instant('CONVERTERS_TAB.JSON_YAML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_JSON_TO_YAML')],
			[this.translateService.instant('CONVERTERS_TAB.YAML_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_YAML_TO_JSON')],
			[this.translateService.instant('CONVERTERS_TAB.CSV_XML_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_CSV_FILE_TO_XML_FILE')],
			[this.translateService.instant('CONVERTERS_TAB.CSV_JSON_CONVERTER'), this.translateService.instant('CONVERTERS_TAB.CONVERT_CSV_TO_JSON')],
		]);
	}

	getFileModes() {
		return new Map<String, String>([
			[XmlConstants.XSD_GENERATOR, 'application/xml'],
			[XmlConstants.XML_TO_JSON_CONVERTER, 'application/ld+json'],
			[XmlConstants.JSON_TO_XML_CONVERTER, 'application/xml'],
			[XmlConstants.JSON_TO_YAML_CONVERTER, 'application/yaml'],
			[XmlConstants.YAML_TO_JSON_CONVERTER, 'application/ld+json'],
			[XmlConstants.CSV_TO_XML_CONVERTER, 'application/xml'],
			[XmlConstants.CSV_TO_JSON_CONVERTER, 'application/ld+json'],
		]);
	}

	getApi() {
		return new Map<String, String>([
			[XmlConstants.XSD_GENERATOR, 'convertXmlToXsd'],
			[XmlConstants.XML_TO_JSON_CONVERTER, 'convertXmlToJson'],
			[XmlConstants.JSON_TO_XML_CONVERTER, 'convertJsonToXml'],
			[XmlConstants.JSON_TO_YAML_CONVERTER, 'convertJsonToYaml'],
			[XmlConstants.YAML_TO_JSON_CONVERTER, 'convertYamlToJson'],
			[XmlConstants.CSV_TO_XML_CONVERTER, 'convertCsvToXml'],
			[XmlConstants.CSV_TO_JSON_CONVERTER, 'convertCsvToJson'],
		]);
	}
}
