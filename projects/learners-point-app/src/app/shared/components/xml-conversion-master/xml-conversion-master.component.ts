import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-xml-conversion-master',
  templateUrl: './xml-conversion-master.component.html',
  styleUrls: ['./xml-conversion-master.component.scss']
})
export class XmlConversionMasterComponent implements OnInit {
  childLabel = '';
  xmlString = '';

  
  constructor() { }

  ngOnInit(): void {
  }
  loadChild(event) {
    this.childLabel = event.textContent;
  }
}
