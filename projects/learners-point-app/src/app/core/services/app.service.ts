import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AwdSessionService } from '@awd-ng-lib/session';
import { IAwdRestConfig } from '@awd-ng-lib/rest';
import { AwdLanguageDetectService, AwdTranslateConfigService, AwdUrlUtil, AwdWindowUtil } from '@awd-ng-lib/util';


const MGMT_CONSOLE_WORKSPACE_NAME = 'WSMGTCNS';

@Injectable()
export class AppService {
  private window: any = this.awdWindowUtil.getBrowserWindow();
  awdEvents: any;

  public static restConfig: IAwdRestConfig = {
    csrfToken: null,
    baseRestPath: null,
  };

  constructor(
    private http: HttpClient,
    private awdUrlUtil: AwdUrlUtil,
    private awdSession: AwdSessionService,

    private languageDetectService: AwdLanguageDetectService,
    private translateService: AwdTranslateConfigService,
    private browserTitleService: Title,
  
    private awdWindowUtil: AwdWindowUtil
  ) { }

  initializeApp() {
   
    return new Promise<boolean | void>((resolve) => {
      const obs$ = forkJoin([
        this.initTranslationService()
       
        
      
      ]);

      obs$.subscribe({
        complete: () => {
          this.window.APP_READY = true;
          resolve(true);
        },
      });
    });
  }

 

  private initTranslationService(): Observable<any> {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEOrEdge) {
      return this.languageDetectService.getLanguageList().pipe(
        map((data) => {
          const ieLanguage = data.split(',');
          const formattedLanguage = ieLanguage[0].split('-')[0];
          return this.translateService.setCulture(formattedLanguage.toLowerCase());
        })
      );
    } else {
      const browserLang = navigator.language;
      return this.translateService.setCulture(browserLang.toLowerCase());
    }
  }


}
