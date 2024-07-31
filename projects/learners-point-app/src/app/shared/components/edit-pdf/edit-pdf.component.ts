import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';





@Component({
  selector: 'app-edit-pdf',
  templateUrl: './edit-pdf.component.html',
  styleUrls: ['./edit-pdf.component.scss']
})
export class EditPdfComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

selectedFile:ArrayBuffer;
  ngOnInit(): void {
 
  }

  ngAfterViewInit(): void {

  }

  handleFileInput(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.selectedFile = new Uint8Array(fileReader.result as ArrayBuffer);
       // this.loadPdf(typedArray);
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  
  

}
