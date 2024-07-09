import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const DEFAULT_CULTURE = 'en-us';

@Injectable({
  providedIn: 'root',
})
export class AwdTranslateConfigService {
  translations: any;
  currentLanguage: string = DEFAULT_CULTURE;
  supportedLanguages = [
    'en-gb',
    'zh',
    'zh-cn',
    'en-us',
    'en-au',
    'en-nz',
    'en-za',
    'en-ie',
    'en-ca',
    'ja'
  ];

  constructor(private translateService: TranslateService) {
    translateService.addLangs(this.supportedLanguages);
    translateService.setDefaultLang(DEFAULT_CULTURE);
  }

  setCulture(culture: string): Observable<any> {
    if (this.supportedLanguages.indexOf(culture) === -1) {
      culture = DEFAULT_CULTURE;
    }
    localStorage.setItem('language', culture);
    this.currentLanguage = culture;

    return this.translateService.use(culture).pipe(
      tap((translations) => {
        this.translations = this.getTranslationsList(
          translations,
          undefined,
          {}
        );
      })
    );
  }

  getTranslationsList(bareTranslations, parentKey, res) {
    Object.keys(bareTranslations).forEach((key) => {
      if (typeof bareTranslations[key] === 'string') {
        const k = parentKey ? `${parentKey}.${key}` : `${key}`;
        res[k] = bareTranslations[key];
      } else {
        const p = parentKey === undefined ? key : `${parentKey}.${key}`;
        this.getTranslationsList(bareTranslations[key], p, res);
      }
    });

    return res;
  }

  getTranslations() {
    return this.translations;
  }

  getTranslator(): TranslateService {
    return this.translateService;
  }
}
