import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../core/services/email-service.service';
import { IUserData } from '../../interfaces/IUserModel';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {

  name: string;
  subject: string;
  cemail: string;
  desc: string;
  acceptedFiles: String = "image/*.jpeg";

  model: IUserData;
  uploadedFiles: File[] = [];

  constructor(private emailservice: EmailService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.acceptedFiles = "image/*.jpeg";

  }
  uploadFile(event) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

  }
  submitData() {
    this.model = {
      subject: this.subject,
      name: this.name,
      description: this.desc,
      emailID: this.cemail,
    };

    this.emailservice.reportIssue(this.uploadedFiles, this.model).subscribe();
    this.messageService.add({ severity: 'info', summary: 'Issue Reported Successfuly !', detail: '' });
  }
}
