import { ModuleWithProviders, NgModule } from '@angular/core';
import { KeyboardShortcutsComponent } from './keyboard-shortcuts.component';
import { KeyboardShortcutsService } from './keyboard-shortcuts.service';
import { CommonModule } from '@angular/common';
import { KeyboardRegisterDocumentService } from './keyboard-register-document.service';

@NgModule({
  imports: [CommonModule],
  entryComponents: [],
  declarations: [KeyboardShortcutsComponent],
  exports: [KeyboardShortcutsComponent],
})
export class KeyboardShortcutsModule {
  public static forRoot(): ModuleWithProviders<KeyboardShortcutsModule> {
    return {
      ngModule: KeyboardShortcutsModule,
      providers: [KeyboardShortcutsService, KeyboardRegisterDocumentService],
    };
  }
}
