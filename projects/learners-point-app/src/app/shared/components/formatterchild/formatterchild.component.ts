import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { XmlConstants } from '../../constants/enums/xml-headers';
import xmlFormat from 'xml-formatter';
import * as vkbeautify from 'vkbeautify';
import { format } from 'sql-formatter';
import { ClipboardService } from 'ngx-clipboard'
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
	selector: 'app-formatterchild',
	templateUrl: './formatterchild.component.html',
	styleUrls: ['./formatterchild.component.scss']
})
export class FormatterchildComponent implements OnInit {
	@ViewChild(CodemirrorComponent) codeMirrorComponent: CodemirrorComponent;

	@Input() childLabel: String;
	label: String = XmlConstants.FORMAT_XML;
	headerTitle: String = XmlConstants.XML_FORMATTER;
	type: String = XmlConstants.XML_FORMATTER;
	showResponse = false;
	responseData: String = '';
	getSubcription: Subscription;
	isDisabled: false;
	textareaValue: string = '';
	mode: String = '';
	rating: number;
	constructor(private clipboardService: ClipboardService) { }

	ngOnInit(): void {
		this.mode = 'application/xml'
		this.headerTitle = XmlConstants.XML_FORMATTER;
		this.label = XmlConstants.FORMAT_XML;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.childLabel.currentValue) {
			this.headerTitle = this.getHeaders().get(changes.childLabel.currentValue);
			this.label = this.getLabels().get(changes.childLabel.currentValue);
			this.mode = this.getFileModes().get(changes.childLabel.currentValue);
			this.showResponse = false;
			this.responseData = '';
			this.textareaValue = '';
			this.type = changes.childLabel.currentValue;
			this.rating = null;
			setTimeout(() => { }, 0);

		}
	}

	getResponse() {

		if (this.textareaValue) {
			this.processRequest(this.type, this.textareaValue)
		}
		else {
			this.responseData = '';
			this.showResponse = false;
		}
	}

	parseXMLData(payload): string {
		const parser = new DOMParser();
		const xmlDocument = parser.parseFromString(payload, 'application/xml');
		const formattedXml = new XMLSerializer().serializeToString(xmlDocument);
		payload = formattedXml;
		return vkbeautify.xml(payload);
	}

	processRequest(type, payload) {
		this.responseData = this.getFunction().get(this.mode)(payload);
		this.showResponse = true;
		this.textareaValue = '';
		setTimeout(() => { }, 0);
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
			[XmlConstants.XML_FORMATTER, XmlConstants.XML_FORMATTER],
			[XmlConstants.JSON_FORMATTER, XmlConstants.JSON_FORMATTER],
			[XmlConstants.SQL_FORMATTER, XmlConstants.SQL_FORMATTER],
			[XmlConstants.HTML_FORMATTER, XmlConstants.HTML_FORMATTER],

		]);
	}
	getLabels() {
		return new Map<String, String>([
			[XmlConstants.XML_FORMATTER, XmlConstants.FORMAT_XML],
			[XmlConstants.JSON_FORMATTER, XmlConstants.FORMAT_JSON],
			[XmlConstants.SQL_FORMATTER, XmlConstants.FORMAT_SQL],
			[XmlConstants.HTML_FORMATTER, XmlConstants.FORMAT_HTML],
		]);
	}

	getFileModes() {
		return new Map<String, String>([
			[XmlConstants.XML_FORMATTER, 'application/xml'],
			[XmlConstants.JSON_FORMATTER, 'application/ld+json'],
			[XmlConstants.SQL_FORMATTER, 'text/x-mysql'],
			[XmlConstants.HTML_FORMATTER,'application/html' ],
		]);
	}
	getFunction() {
		return new Map<String, (payload:any) => String>([
      ['application/xml', this.parseXMLData],
      ['application/ld+json', this.getJSONData],
      ['text/x-mysql', this.getSqlData],
			['application/html', this.getDefaultData],
    ]);
	}

	getJSONData(payload)
	{
		const parsedJson = JSON.parse(payload);
		return JSON.stringify(parsedJson, null, 2);
	}

	getSqlData(payload)
	{
	return format(payload);
	}
	
	getDefaultData(payload)
	{
		return payload;
	}
	
}
