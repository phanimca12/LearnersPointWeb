import { Component, OnInit } from '@angular/core';

import {FieldsetModule} from 'primeng/fieldset'
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  property:any='';
  isShown = false;

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  navigateBase64Link()
  {
    this.router.navigate(['/base64master']);
  }

  navigateXmlConversionLink()
  {
    this.router.navigate(['/xmlconversion']);
  }
  navigateBaseFormatter()
  {
    this.router.navigate(['/bformatter']);
  }
  navigateBaseGenerator()
  {
    this.router.navigate(['/basegenerator']);
  }

  navigateBasePDF()
  {
    this.router.navigate(['/basepdfConverter']);
  }
  navigateMergePDF()
  {
    this.router.navigate(['/mergePDFContainer']);
  }
  navigateEditPDF()
  {
    this.router.navigate(['/editPDFContainer']);
  }
}
