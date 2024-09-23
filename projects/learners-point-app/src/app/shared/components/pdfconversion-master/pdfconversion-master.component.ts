import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfconversion-master',
  templateUrl: './pdfconversion-master.component.html',
  styleUrls: ['./pdfconversion-master.component.scss']
})
export class PDFConversionMasterComponent implements OnInit {
  childLabel = '';
  constructor() { }

  ngOnInit(): void {
  }
  loadBase64Child(event) {

    this.childLabel = event.textContent.trim();

  }
}
