import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-progresscontainer',
  templateUrl: './progresscontainer.component.html',
  styleUrls: ['./progresscontainer.component.scss']
})
export class ProgresscontainerComponent implements OnInit {
  progressValue:number=0;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.initProgressBar();
  }

  initProgressBar()
  {
    let interval = setInterval(() => {
      this.progressValue = this.progressValue + Math.floor(Math.random() * 10) + 1;
      if (this.progressValue >= 100) {
          this.progressValue = 100;
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
          clearInterval(interval);
      }
  }, 2000);
  }
}
