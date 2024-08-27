import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {

  subject: string;
  cemail: string;
  desc: string;
  acceptedFiles: String = "image/*.jpeg";

  uploadedFiles: File[] = [];

  constructor() { }

  ngOnInit(): void {
    this.acceptedFiles = "image/*.jpeg";

  }
  uploadFile(event) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

  }
}
