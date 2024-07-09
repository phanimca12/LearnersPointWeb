import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AwdLanguageDetectService } from './awd-language-detect.service';
import { AwdTranslateConfigService } from './awd-translate-config.service';
import { ENVIRONMENT_TOKEN } from './di';
import { Environment } from './types';

// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
// }

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ],
})
export class AwdTranslateConfigModule {
  static forRoot(
    env: Environment
  ): ModuleWithProviders<AwdTranslateConfigModule> {
    return {
      ngModule: AwdTranslateConfigModule,
      providers: [
        AwdTranslateConfigService,
        AwdLanguageDetectService,
        { provide: ENVIRONMENT_TOKEN, useValue: env },
      ],
    };
  }
}
