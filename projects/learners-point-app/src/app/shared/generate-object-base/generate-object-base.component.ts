import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-object-base',
  templateUrl: './generate-object-base.component.html',
  styleUrls: ['./generate-object-base.component.scss']
})
export class GenerateObjectBaseComponent implements OnInit {

  childLabel = '';

  constructor() { }

  ngOnInit(): void {
  }

  loadBase64Child(event) {
    this.childLabel = event.textContent;
    console.log(event);
    //this.router.navigate(['base64master/base64child']);
  }
}
