import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService, private zone: NgZone) { }

  showSuccess(message: string, toastLife = 5000): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: message, life: toastLife });
    });
  }

  showWarn(message: string, toastLife = 12000): void {
    this.zone.run(() => {
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: message, life: toastLife });
    });
  }

  showError(message: string, toastLife = 12000): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: message, life: toastLife });
    });
  }

  showInfo(message: string, toastLife = 5000): void {
    this.zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      this.messageService.add({ severity: 'info', summary: 'No Data available', detail: message, life: toastLife });
    });
  }
}
