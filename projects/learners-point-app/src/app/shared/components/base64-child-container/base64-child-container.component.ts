import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Base64Headers } from '../../constants/enums/base64-headers';
import { Base64ConversionService } from '../../../core/services/base64-conversion.service';

import { ClipboardService } from 'ngx-clipboard';

@Component({
	selector: 'app-base64-child-container',
	templateUrl: './base64-child-container.component.html',
	styleUrls: ['./base64-child-container.component.scss']
})
export class Base64ChildContainerComponent implements OnInit, OnChanges {

	@ViewChild('resultArea') resultArea: ElementRef<HTMLTextAreaElement>;

	headerTitle: String = Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT;
	label: String = Base64Headers.ENCODE;
	@Input() childLabel: String;
	showResponse = false;
	responseData: string = '';
	textareaValue: string = '';
	type: String = Base64Headers.STRING_ENCODE;
	getSubcription: Subscription;
	isDisabled: true;
	rating: number;
	constructor(private base64ConversionService: Base64ConversionService, private clipboardService: ClipboardService) { }

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		this.rating = null;
		if (changes.childLabel.currentValue)
			this.headerTitle = this.getHeaderTitle(changes.childLabel.currentValue);
		this.showResponse = false;
		this.type = changes.childLabel.currentValue;
	}

	ngOnInit(): void {

		this.headerTitle = this.getHeaderTitle(this.childLabel);
		this.type = this.childLabel;
		this.isDisabled = true;
	}
	getHeaderTitle(title: String): String {
		if (title === 'String Encode') {
			this.label = Base64Headers.ENCODE;

			return this.headerTitle = Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT;
		}
		else if (title === 'String Decode') {
			this.label = Base64Headers.DECODE;
			return this.headerTitle = Base64Headers.DECODE_FROM_BASE64_FORMAT
		}
		else if (title === 'URL Encode') {
			this.label = Base64Headers.ENCODE;
			return this.headerTitle = Base64Headers.ENCODE_URL_TO_ENCODED_FORMAT;
		}
		else if (title === 'URL Decode') {
			this.label = Base64Headers.DECODE
			return this.headerTitle = Base64Headers.DECODE_FROM_URL_ENCODED_FORMAT;
		}
		else {
			return this.headerTitle = Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT;
		}
	}
	getResponse() {
		const payload =
		{
			"dataToConvert": this.textareaValue
		}
		if (payload.dataToConvert) {
			this.processRequest(payload)
		}
		else {
			this.showResponse = false;
			this.responseData = '';

		}

	}

	processRequest(payload) {
		if (this.getSubcription) {
			this.getSubcription.unsubscribe();
		}
		this.getSubcription = this.getObservableOfResponse(this.type, payload).subscribe(res => {
			this.responseData = res;
		}
		);
		this.showResponse = true;
		this.textareaValue = '';
		setTimeout(() => { }, 0);

	}
	getObservableOfResponse(type, body): Observable<string> {
		if (body) {
			type = !type ? Base64Headers.STRING_ENCODE : type;

			if (type === 'String Encode') {
				return this.base64ConversionService.encodeStringToBase64(body);
			}
			else if (type === 'String Decode') {
				return this.base64ConversionService.decodeStringToBase64(body);
			}
			else if (type === 'URL Encode') {
				return this.base64ConversionService.encodeURLToBase64(body);
			}
			else if (type === 'URL Decode') {
				return this.base64ConversionService.decodeURLToBase64(body);
			}
			return null;
		}

	}

	getRating(event) {
		console.log(event.value);
		this.rating = event.value;
	}

	copyText() {
		this.resultArea.nativeElement.select();
		document.execCommand('copy')
	}

}
