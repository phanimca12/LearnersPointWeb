import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

declare const WebViewer: any;

@Component({
	selector: 'app-web-viewer',
	templateUrl: './webviewer.component.html',
	styleUrls: ['./webviewer.component.scss']
})
export class WebViewerComponent implements OnInit {

	@Input() file: ArrayBuffer;

	@ViewChild('viewer', { static: true }) viewer: ElementRef;
	private isViewerInitialized: boolean = false;
	arrayBuffer: ArrayBuffer;
	wvInstance: any;

	async ngOnInit() {
		//const response = await fetch('https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf');
		//this.arrayBuffer = await response.arrayBuffer();
		this.initWebViewerInstance();
		this.isViewerInitialized = true;
		this.arrayBuffer=this.file;
		this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);

		if (changes.file.currentValue) {
					this.arrayBuffer = changes.file.currentValue;
			if (!this.isViewerInitialized) {
				this.initWebViewerInstance();
					this.isViewerInitialized = true;
			this.wvInstance.Core.documentViewer.loadDocument(this.arrayBuffer);
			}
			else
			{
				this.wvInstance.Core.documentViewer.loadDocument(this.arrayBuffer);
			}
		}
		setTimeout(() => { }, 0);
	}

	wvDocumentLoadedHandler(): void {
		// you can access docViewer object for low-level APIs
		const { documentViewer, annotationManager, Annotations } = this.wvInstance.Core;
		// and access classes defined in the WebViewer iframe
		const rectangle = new Annotations.RectangleAnnotation();
		rectangle.PageNumber = 1;
		rectangle.X = 100;
		rectangle.Y = 100;
		rectangle.Width = 250;
		rectangle.Height = 250;
		rectangle.StrokeThickness = 5;
		rectangle.Author = annotationManager.getCurrentUser();
		annotationManager.addAnnotation(rectangle);
		annotationManager.drawAnnotations(rectangle.PageNumber);
		// see https://docs.apryse.com/api/web/WebViewerInstance.html for the full list of low-level APIs
	}

	initWebViewerInstance()
	{
		WebViewer({
			path: '../../wv-resources/lib',
			licenseKey: 'demo:1722420472457:7e666645030000000003beb3a0b5cb5378303edd584685dcaccd8d634ee', // sign up to get a key at https://dev.apryse.com
			initialDoc: null
		}, this.viewer.nativeElement).then(instance => {
			this.wvInstance = instance;
			instance.UI.openElement('notesPanel');
			this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
				const [pageNumber] = e.detail;
				console.log(`Current page is ${pageNumber}`);
			});
			instance.Core.documentViewer.addEventListener('annotationsLoaded', () => {
				console.log('annotations loaded');
			});
			instance.Core.documentViewer.addEventListener('documentLoaded', this.wvDocumentLoadedHandler)
		})
		setTimeout(() => { }, 0);
	}
	initWebViewer(file:ArrayBuffer,licenceKey:any)
	{
		WebViewer({
			path: '../../wv-resources/lib',
			licenseKey: 'demo:1722420472457:7e666645030000000003beb3a0b5cb5378303edd584685dcaccd8d634ee', // sign up to get a key at https://dev.apryse.com
			initialDoc: null
		}, this.viewer.nativeElement).then(instance => {
			this.wvInstance = instance;
			instance.UI.openElement('notesPanel');
			this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
				const [pageNumber] = e.detail;
				console.log(`Current page is ${pageNumber}`);
			});
			instance.Core.documentViewer.addEventListener('annotationsLoaded', () => {
				console.log('annotations loaded');
			});

			this.wvInstance.Core.documentViewer.loadDocument(file);
			//instance.Core.documentViewer.loadDocument(file);

			instance.Core.documentViewer.addEventListener('documentLoaded', this.wvDocumentLoadedHandler)
		})
	}
	async ngAfterViewInit(): Promise<void> {
		// The following code initiates a new instance of WebViewer.


		
	}

}
