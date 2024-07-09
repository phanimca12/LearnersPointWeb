import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaneDividerDirective } from './pane-divider.directive';
import { FileDropZoneDirective } from './file-drop-zone.directive';

import { MenuModule } from 'primeng/menu';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MenuModule, AngularSvgIconModule, CommonModule],
  entryComponents: [],
  declarations: [PaneDividerDirective, FileDropZoneDirective],
  exports: [PaneDividerDirective, FileDropZoneDirective],
})
export class AwdUiModule {}
