/*
 * Public API Surface of keyboard-shortcuts
 */

export { KeyboardShortcutsModule } from './lib/keyboard-shortcuts.module';
import './lib/polyfills';
export {
  ShortcutInput,
  ShortcutEventOutput,
  AllowIn,
  Shortcut as ShortcutDirectiveInput,
} from './lib/keyboard-shortcuts.interfaces';
export { KeyboardRegisterDocumentService } from './lib/keyboard-register-document.service';
export { KeyboardShortcutsComponent } from './lib/keyboard-shortcuts.component';
