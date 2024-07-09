import { Component, OnInit } from '@angular/core';
import {FieldsetModule} from 'primeng/fieldset'
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loading = false;
  allPagesFetched = false;

  property:any='';
  isShown = false;
  constructor() { }

  ngOnInit(): void {
  }
  onScrollEnd(): void {
    if (this.loading || this.allPagesFetched) {
      return;
    }
}
}
