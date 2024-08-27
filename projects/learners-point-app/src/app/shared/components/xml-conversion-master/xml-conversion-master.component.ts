import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
