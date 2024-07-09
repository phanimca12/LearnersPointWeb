import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AwdSessionService } from './awd-session.service';

@NgModule({
  imports: [CommonModule],
})
export class AwdSessionModule {
  static forRoot(): ModuleWithProviders<AwdSessionModule> {
    return {
      ngModule: AwdSessionModule,
      providers: [AwdSessionService],
    };
  }
}
