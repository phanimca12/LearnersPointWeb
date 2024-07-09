import { Injectable } from '@angular/core';

function getBrowserWindow(): Window {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class AwdWindowUtil {
  getBrowserWindow(): Window {
    return getBrowserWindow();
  }
}
