import { EditPdfComponent } from './../shared/components/edit-pdf/edit-pdf.component';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';


@Component({
  selector: 'app-web-viewer',
  templateUrl: './webviewer.component.html',
  styleUrls: ['./webviewer.component.scss']
})
export class WebViewerComponent implements OnInit {
  @Input() file: ArrayBuffer;
  private viewerElementId = 'pdf-viewer';
  private isViewerInitialized: boolean = false;
  arrayBuffer: ArrayBuffer;
  wvInstance: any;

  async ngOnInit() {
    this.initWebViewerInstance();
    this.isViewerInitialized = true;
    this.arrayBuffer = this.file;
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.file.currentValue) {
      this.arrayBuffer = changes.file.currentValue;
      if (!this.isViewerInitialized) {
        this.initWebViewerInstance();
        this.isViewerInitialized = true;
        this.wvInstance.Core.documentViewer.loadDocument(this.arrayBuffer);
      }
      else {
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

  }

  initWebViewerInstance() {
    WebViewer({
      path: 'assets/wv-resources/lib',
      initialDoc: null,
      fullAPI: true,
      ui: 'beta',
      licenseKey: 'demo:1722420472457:7e666645030000000003beb3a0b5cb5378303edd584685dcaccd8d634e'
    }, document.getElementById(this.viewerElementId) as HTMLElement).then((instance) => {
      const { documentViewer, Annotations, Tools } = instance.Core;
      const { UI } = instance;
      UI.enableFeatures([instance.UI.Feature.ContentEdit]);
      this.enableAllToolbars(UI);
      this.wvInstance = instance;
        fullAPI: true
      documentViewer.addEventListener('documentLoaded', () => {
        instance.UI.openElements(['notesPanel']);
        
      });
    }).catch((error) => {
      console.error('Error loading WebViewer:', error);
    });
  }
  enableAllToolbars(UI: any) {
    // Show the main toolbar
    UI.enableElements(['toolbarGroup-annotation', 'toolbarGroup-edit', 'toolbarGroup-measure', 'toolbarGroup-forms', 'toolbarGroup-shapes', 'toolbarGroup-edit-text']);

    UI.enableElements(['toolbar']);

  }

}

