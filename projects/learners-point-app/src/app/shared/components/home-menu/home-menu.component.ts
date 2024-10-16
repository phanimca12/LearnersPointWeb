import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {FieldsetModule} from 'primeng/fieldset'
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ReportIssueComponent } from '../report-issue/report-issue.component';



@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  property:any='';
  isShown = false;
  ref: DynamicDialogRef;

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  
  constructor(public router:Router,public dialogService: DialogService, public messageService: MessageService) { }

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
  navigateHome()
  {
    this.router.navigate(['/home']);
  }
  showForm()
  {
    this.ref = this.dialogService.open(ReportIssueComponent, {
      header: 'Report an issue',
      width: '70%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
  });


  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}
closeNavbar() {
  const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
  const navbarCollapse = document.querySelector('#navbarNav') as HTMLElement;

  // Remove the 'show' class to collapse the navbar
  if (navbarCollapse.classList.contains('show')) {
    navbarCollapse.classList.remove('show');
    navbarToggler.setAttribute('aria-expanded', 'false');
  }
}
}
