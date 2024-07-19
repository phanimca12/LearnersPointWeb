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
		if (changes.childLabel.currentValue) {
			this.headerTitle = this.getHeaders().get(changes.childLabel.currentValue);
			this.label = this.getLabels().get(changes.childLabel.currentValue);
			this.showResponse = false;
			this.type = changes.childLabel.currentValue;
		}
	}

	ngOnInit(): void {
		this.headerTitle = Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT;
		this.type = !this.childLabel ? Base64Headers.STRING_ENCODE: this.childLabel;
		this.isDisabled = true;
		this.label= Base64Headers.ENCODE;
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
			return this.base64ConversionService[`${this.getApi().get(this.type)}`](body);
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
	getHeaders() {
		return new Map<String, String>([
			[Base64Headers.STRING_ENCODE, Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT],
			[Base64Headers.STRING_DECODE, Base64Headers.DECODE_FROM_BASE64_FORMAT],
			[Base64Headers.URL_ENCODE, Base64Headers.ENCODE_URL_TO_ENCODED_FORMAT],
			[Base64Headers.URL_DECODE, Base64Headers.ENCODE_STRING_TO_BASE64_FORMAT],

		]);
	}
	getLabels() {
		return new Map<String, String>([
			[Base64Headers.STRING_ENCODE, Base64Headers.ENCODE],
			[Base64Headers.STRING_DECODE, Base64Headers.DECODE],
			[Base64Headers.URL_ENCODE, Base64Headers.ENCODE],
			[Base64Headers.URL_DECODE, Base64Headers.DECODE],
		]);
	}

	getApi() {
		return new Map<String, String>([
			[Base64Headers.STRING_ENCODE, 'encodeStringToBase64'],
			[Base64Headers.STRING_DECODE, 'decodeStringToBase64'],
			[Base64Headers.URL_ENCODE, 'encodeURLToBase64'],
			[Base64Headers.URL_DECODE, 'decodeURLToBase64'],
		]);
	}
}
