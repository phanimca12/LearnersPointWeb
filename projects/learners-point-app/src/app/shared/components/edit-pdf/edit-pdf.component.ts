import { FileData } from './../../interfaces/FileData';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { HomeService } from '../../../core/services/home.service';




@Component({
  selector: 'app-edit-pdf',
  templateUrl: './edit-pdf.component.html',
  styleUrls: ['./edit-pdf.component.scss']
})
export class EditPdfComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileUpload') fileUpload: any;
  selectedFile: ArrayBuffer;

  file: ArrayBuffer;
  ngOnInit(): void {
    this.selectedFile = null;
    this.readWASM();
  }

  constructor(private homeService: HomeService) { }
  clear() {
    this.fileUpload.clear();
  }
  ngAfterViewInit(): void {

  }

  /*   handleFileInput(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.selectedFile = new Uint8Array(fileReader.result as ArrayBuffer);
          // this.loadPdf(typedArray);
        };
        fileReader.readAsArrayBuffer(file);
      }
     
    } */

  uploadFile(event) {
    if (event.files.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.selectedFile = new Uint8Array(fileReader.result as ArrayBuffer);
        // this.loadPdf(typedArray);
      };
      fileReader.readAsArrayBuffer(event.files[0]);
    }
    this.clear();
  }

  async readWASM() {
    this.homeService.fetchFile().subscribe(
      (data: ArrayBuffer) => {
        this.file = data;
        const wasmBinary = new Uint8Array(this.file);
        const decoderOpts = {dump:false,ignoreCodeSection:false};
        
      },
      error => {
        console.error('Fetch error:', error);
      }
    );

  
  }

}
