import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyCenterService } from '../../../../_services/notify-center.service';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ExamTest } from '../../../../_models/examtest';
import { SubjectService } from '../../../../_services/subjectService.service';
import { ExamTestDetailService } from '../../../../_services/examTestDetail.service';

@Component({
  templateUrl: 'in-de-thi.component.html'
})

export class InDeThiComponent implements OnInit {
  examTestId: number;
  examTest: any;
  examTestModel: any;
  examTestDetailModel: any;
  nameshool: string;
  semeter: number;
  time: number;
  method: string;
  note: string;
  datetest: any;

  constructor(
    private route: ActivatedRoute,
    private examTestService: ExamTestService,
    private examTestDetailSerive: ExamTestDetailService,
    private notifyCenterService: NotifyCenterService) { }

  ngOnInit() {
    this.examTest = this.route.params.subscribe(params => {
      this.examTestId = +params['examTestId'];
      this.loadDataExamTest();
      this.loadDataExamTestDetail();
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>In đề thi</title>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  loadDataExamTest(): void {
    this.examTestService.getExamTestById(this.examTestId).subscribe(data => {
      this.examTestModel = data;
      console.log(this.examTestModel);
    });
  }

  loadDataExamTestDetail(): void {
    this.examTestDetailSerive.getExamTestDetailById(this.examTestId).subscribe(data => {
      this.examTestDetailModel = data;
      console.log(this.examTestDetailModel);
    });
  }
}
