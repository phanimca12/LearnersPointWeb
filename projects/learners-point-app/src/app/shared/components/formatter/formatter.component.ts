import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.scss']
})
export class FormatterComponent implements OnInit {
  childLabel = '';
  constructor() { }

  ngOnInit(): void {
  }
  loadChild(event) {
    this.childLabel = event.textContent.trim();
  }
}
