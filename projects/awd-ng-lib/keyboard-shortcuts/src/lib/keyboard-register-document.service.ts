import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExternalWindow } from './keyboard-shortcuts.interfaces';

@Injectable({
  providedIn: 'root',
})
export class KeyboardRegisterDocumentService {
  externalWindowsArr: ExternalWindow[] = [];
  externalWindows: BehaviorSubject<ExternalWindow[]>;

  constructor() {
    this.externalWindows = new BehaviorSubject<any>(this.externalWindowsArr);
  }

  register(externalWindow: ExternalWindow) {
    this.externalWindowsArr.push(externalWindow);
    this.externalWindows.next(this.externalWindowsArr);
  }

  getExternalWindows() {
    return this.externalWindows;
  }

  remove(windowId: string) {
    this.externalWindowsArr = this.externalWindowsArr.filter((item) => item.windowId !== windowId);
    this.externalWindows.next(this.externalWindowsArr);
  }

  getWindow(): Window {
    return window;
  }
}
