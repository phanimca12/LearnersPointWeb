
import { EditPdfComponent } from './../shared/components/edit-pdf/edit-pdf.component';
import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import PSPDFKit from 'pspdfkit';
import { WebViewerConst } from '../shared/constants/enums/WebViewer';


@Component({
  selector: 'app-web-viewer',
  templateUrl: './webviewer.component.html',
  styleUrls: ['./webviewer.component.scss']
})
export class WebViewerComponent implements OnInit, OnDestroy {
  @Input() file: Uint8Array;
  arrayBuffer: Uint8Array;

  private instance: any;
  private container: HTMLElement | undefined;

  constructor(private elRef: ElementRef) { }
  async ngOnInit() {
    this.container = this.elRef.nativeElement.querySelector('#pspdfkit-container');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.file.currentValue) {
      this.arrayBuffer = changes.file.currentValue;
      this.loadWebViewer(this.file.buffer);

    }
    setTimeout(() => { }, 0);
  }

  loadWebViewer(file: ArrayBuffer) {
    if (this.instance) {
      PSPDFKit.unload(this.container);
    }

    this.instance = PSPDFKit.load({
      licenseKey: WebViewerConst.KEY,
      baseUrl: location.protocol + "//" + location.host +"/learners-point-app"+ "/assets/",
     
      document: file,
      container: this.container,
      toolbarItems: [
        ...PSPDFKit.defaultToolbarItems,
        { type: "content-editor" },
        {
          type: "form-creator"
        }
      ],
    });

    interactionMode: PSPDFKit.InteractionMode.CONTENT_EDITOR

  }




  async ngOnDestroy(): Promise<void> {
    if (this.instance) {
      try {
        await PSPDFKit.unload(this.container);
        console.log('PSPDFKit instance unloaded successfully');
      } catch (error) {
        console.error('Error unloading PSPDFKit instance:', error);
      }
    }

  }

}

