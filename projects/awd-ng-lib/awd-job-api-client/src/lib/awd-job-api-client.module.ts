import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AwdJobApiClientParserService } from './awd-job-api-client-parser.service';
import { AwdJobApiClientService } from './awd-job-api-client.service';


@NgModule({
  imports: [CommonModule],
})
export class AwdJobApiClientModule {
  static forRoot(): ModuleWithProviders<AwdJobApiClientModule> {
    return {
      ngModule: AwdJobApiClientModule,
      providers: [
        AwdJobApiClientService,
        AwdJobApiClientParserService
      ],
    };
  }
}
