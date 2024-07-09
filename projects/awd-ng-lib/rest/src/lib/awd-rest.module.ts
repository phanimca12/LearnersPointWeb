import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';


@NgModule({
  imports: [CommonModule],
})
export class AwdRestModule {
  static forRoot(): ModuleWithProviders<AwdRestModule> {
    return {
      ngModule: AwdRestModule,
      providers: [],
    };
  }
}