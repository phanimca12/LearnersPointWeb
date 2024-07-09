import { TestBed } from '@angular/core/testing';
import { ExternalWindow } from './keyboard-shortcuts.interfaces';
import { BehaviorSubject } from 'rxjs';
import { KeyboardRegisterDocumentService } from './keyboard-register-document.service';
import { KeyboardShortcutsService } from './keyboard-shortcuts.service';

describe('KeyboardRegisterDocumentService', () => {
  let keyboardRegisterService: KeyboardRegisterDocumentService;
  let window: Window;
  let externalWindow: ExternalWindow;
  let externalWindows: BehaviorSubject<ExternalWindow[]>;
  let externalWindowsArr: ExternalWindow[];
  const WINDOW_ID = 'worklist';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardRegisterDocumentService],
    });

    keyboardRegisterService = TestBed.get(KeyboardRegisterDocumentService);
    window = keyboardRegisterService.getWindow();
    externalWindow = {
      windowId: WINDOW_ID,
      externalWindow: window,
      windowData: { cardId: WINDOW_ID },
    };

    externalWindows = keyboardRegisterService.getExternalWindows();
    externalWindows.subscribe((data) => {
      externalWindowsArr = data;
    });
  });

  it('should be created', () => {
    expect(keyboardRegisterService).toBeTruthy();
  });

  describe('#register', () => {
    it('should register external window', () => {
      keyboardRegisterService.register(externalWindow);
      expect(externalWindowsArr).toContain(externalWindow);
      expect(externalWindowsArr.length).toEqual(1);
    });
  });

  describe('#remove', () => {
    beforeEach((done) => {
      keyboardRegisterService.register(externalWindow);
      externalWindows.subscribe((data) => {
        externalWindowsArr = data;
        done();
      });
    });

    it('should remove external window', () => {
      keyboardRegisterService.remove(WINDOW_ID);
      expect(externalWindowsArr).not.toContain(externalWindow);
      expect(externalWindowsArr.length).toEqual(0);
    });

    it('should do nothing if the window does not exist', () => {
      keyboardRegisterService.remove('does_not_exist');
      expect(externalWindowsArr).toContain(externalWindow);
      expect(externalWindowsArr.length).toEqual(1);
    });
  });

  describe('#getExternalWindows', () => {
    it('should return a behaviour subject of external windows', () => {
      expect(externalWindows instanceof BehaviorSubject).toBeTruthy();
    });
  });

  describe('#getWindow', () => {
    it('should return browser window object', () => {
      expect(window instanceof Window).toBeTruthy();
    });
  });
});
