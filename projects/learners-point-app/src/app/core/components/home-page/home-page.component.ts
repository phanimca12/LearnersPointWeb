import { Component, OnInit } from '@angular/core';
import {FieldsetModule} from 'primeng/fieldset'
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MegaMenuItem } from 'primeng/api/megamenuitem';
import { LanguageConst } from '../../../shared/constants/enums/language';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loading = false;
  allPagesFetched = false;
  items: MegaMenuItem[];
  
  property:any='';
  isShown = false;
  constructor(private translateService: TranslateService,private cdr: ChangeDetectorRef) {

    this.translateService.setDefaultLang('in-hindi');
   }

  ngOnInit(): void {
    this.items = [
      
          
      {
          label: 'Language', icon: 'pi pi-fw pi-cog',
          items: [
              [
                  {
                      label: 'Indian',
                      items: [{label: LanguageConst.HINDI,command:e => this.changeLanguage(e)}, {label: LanguageConst.TELUGU,command:e => this.changeLanguage(e)}, {label: LanguageConst.TAMIL,command:e => this.changeLanguage(e)}]
                  },
                  {
                      label: 'American',
                      items: [{label: LanguageConst.ENGLISH,command:e => this.changeLanguage(e)}]
                  },
                  {
                      label: 'Chinese',
                      items: [{label: LanguageConst.CHINESE,command:e => this.changeLanguage(e)}]
                  },
                  {
                    label: 'Japanese',
                    items: [{label: LanguageConst.JAPANESE,command:e => this.changeLanguage(e)}]
                },
                {
                  label: 'Thai',
                  items: [{label: LanguageConst.THAI,command:e => this.changeLanguage(e)}]
              }
              ]
          ]
      }
  ]
  }
  onScrollEnd(): void {
    if (this.loading || this.allPagesFetched) {
      return;
    }
}

changeLanguage(e:any)
{
  if(e.item.label)
  {
 let lang:string= this.getLangFile().get(e.item.label).toString();
  this.translateService.use(lang);
  this.cdr.detectChanges();
  }
}

getLangFile() {
  return new Map<String, String>([
    [LanguageConst.HINDI, "in-hindi"],
    [LanguageConst.TELUGU, "in-telugu"],
    [LanguageConst.TAMIL, "in-tamil"],
    [LanguageConst.ENGLISH, "en-us"],
    [LanguageConst.CHINESE, "zh-cn"],
    [LanguageConst.JAPANESE, "ja"],
    [LanguageConst.THAI, "thai"]
 
  ]);
}
}
