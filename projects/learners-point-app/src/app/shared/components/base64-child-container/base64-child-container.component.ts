import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Base64Headers } from '../../constants/enums/base64-headers';
import { Base64ConversionService } from '../../../core/services/base64-conversion.service';

import { ClipboardService } from 'ngx-clipboard';

import { TranslateService } from '@ngx-translate/core';



@Component({
	selector: 'app-base64-child-container',
	templateUrl: './base64-child-container.component.html',
	styleUrls: ['./base64-child-container.component.scss']
})
export class Base64ChildContainerComponent implements OnInit, OnChanges,OnDestroy  {

	@ViewChild('resultArea') resultArea: ElementRef<HTMLTextAreaElement>;

	headerTitle: String = this.translateService.instant('ENCODERS_TAB.ENCODE_STRING_TO_BASE64_FORMAT');
	label: String = this.translateService.instant('ENCODERS_TAB.ENCODE');
	@Input() childLabel: String;
	showResponse = false;
	responseData: string = '';
	textareaValue: string = '';
	type: String = this.translateService.instant('ENCODERS_TAB.STRING_ENCODE');
	getSubcription: Subscription;
	isDisabled: true;
	rating: number;

	private langChangeSubscription: Subscription;

	constructor(private base64ConversionService: Base64ConversionService, private clipboardService: ClipboardService, private translateService: TranslateService) 
	
	{ 
		this.langChangeSubscription = this.translateService.onLangChange.subscribe();

	}



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

		this.headerTitle = this.translateService.instant('ENCODERS_TAB.ENCODE_STRING_TO_BASE64_FORMAT');
		this.type = !this.childLabel ? Base64Headers.STRING_ENCODE: this.childLabel;
		this.isDisabled = true;
		this.label=this.translateService.instant('ENCODERS_TAB.ENCODE');
		setTimeout(() => { }, 0);
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
			[this.translateService.instant('ENCODERS_TAB.STRING_ENCODE'), this.translateService.instant('ENCODERS_TAB.ENCODE_STRING_TO_BASE64_FORMAT')],
			[this.translateService.instant('ENCODERS_TAB.STRING_DECODE'), this.translateService.instant('ENCODERS_TAB.DECODE_STRING_FROM_BASE64_FORMAT')],
			[this.translateService.instant('ENCODERS_TAB.URL_ENCODE'), this.translateService.instant('ENCODERS_TAB.ENCODE_URL_ENCODED_FORMAT')],
			[this.translateService.instant('ENCODERS_TAB.URL_DECODE'), this.translateService.instant('ENCODERS_TAB.DECODE_URL_ENCODED_FORMAT')],

		]);
	}
	getLabels() {
		return new Map<String, String>([
			[this.translateService.instant('ENCODERS_TAB.STRING_ENCODE'), this.translateService.instant('ENCODERS_TAB.ENCODE')],
			[this.translateService.instant('ENCODERS_TAB.STRING_DECODE'), this.translateService.instant('ENCODERS_TAB.DECODE')],
			[this.translateService.instant('ENCODERS_TAB.URL_ENCODE'), this.translateService.instant('ENCODERS_TAB.ENCODE')],
			[this.translateService.instant('ENCODERS_TAB.URL_DECODE'), this.translateService.instant('ENCODERS_TAB.DECODE')]
		]);
	}

	getApi() {
		return new Map<String, String>([
			[this.translateService.instant('ENCODERS_TAB.STRING_ENCODE'), 'encodeStringToBase64'],
			[this.translateService.instant('ENCODERS_TAB.STRING_DECODE'), 'decodeStringToBase64'],
			[this.translateService.instant('ENCODERS_TAB.URL_ENCODE'), 'encodeURLToBase64'],
			[this.translateService.instant('ENCODERS_TAB.URL_DECODE'), 'decodeURLToBase64'],
		]);
	}

	ngOnDestroy() {
		if (this.langChangeSubscription) {
		  this.langChangeSubscription.unsubscribe();
		}
}
}
