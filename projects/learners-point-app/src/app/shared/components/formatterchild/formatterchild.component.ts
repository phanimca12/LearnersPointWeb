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
	responseData: string = '';
	getSubcription: Subscription;
	isDisabled: false;
	textareaValue: string = '';
	mode = '';
	rating:number;
	constructor(private clipboardService:ClipboardService) { }

	ngOnInit(): void {
		this.mode = 'application/xml'
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.childLabel.currentValue)
			this.headerTitle = this.getHeaderTitle(changes.childLabel.currentValue);
		this.showResponse = false;
		this.responseData = '';
		this.textareaValue = '';
		this.type = changes.childLabel.currentValue;

		setTimeout(() => { }, 0);
		this.rating=null;
	}

	getHeaderTitle(title: String): String {
		if (title === 'XML Formatter') {
			this.label = XmlConstants.FORMAT_XML
			this.mode = 'application/xml'
			return this.headerTitle = XmlConstants.XML_FORMATTER;
		}
		else if (title === 'JSON Formatter') {
			this.label = XmlConstants.FORMAT_JSON;
			this.mode = 'application/ld+json'
			return this.headerTitle = XmlConstants.JSON_FORMATTER
		}
		else if (title === 'HTML Formatter') {
			this.label = XmlConstants.FORMAT_HTML
			this.mode = 'application/html'

			return this.headerTitle = XmlConstants.HTML_FORMATTER
		}
		else if (title === 'SQL Formatter') {
			this.label = XmlConstants.FORMAT_SQL
			this.mode = 'text/x-mysql'
			return this.headerTitle = XmlConstants.SQL_FORMATTER
		}
		else {
			return this.headerTitle = XmlConstants.XML_FORMATTER;
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

		if (this.mode === 'application/xml') {
			this.responseData = this.parseXMLData(payload)
		}
		else if (this.mode === 'application/ld+json') {

			const parsedJson = JSON.parse(payload);
			this.responseData = JSON.stringify(parsedJson, null, 2);
		}
		else if (this.mode === 'text/x-mysql') {

			this.responseData = format(payload);
		}
		else {
			this.responseData = payload;
		}

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
}
