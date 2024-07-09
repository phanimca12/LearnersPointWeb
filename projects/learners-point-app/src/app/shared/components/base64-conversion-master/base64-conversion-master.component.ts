import { identity } from './../../../../../../awd-ng-lib/keyboard-shortcuts/src/lib/utils';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-base64-conversion-master',
  templateUrl: './base64-conversion-master.component.html',
  styleUrls: ['./base64-conversion-master.component.scss']
})
export class Base64ConversionMasterComponent implements OnInit {

childLabel='';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  loadBase64Child(event) {
   
    this.childLabel=event.textContent;
    console.log(event);
    
        //this.router.navigate(['base64master/base64child']);
  }
}
