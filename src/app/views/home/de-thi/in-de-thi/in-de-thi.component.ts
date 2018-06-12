import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyCenterService } from '../../../../_services/notify-center.service';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ExamTest } from '../../../../_models/examtest';
import { SubjectService } from '../../../../_services/subjectService.service';
import { ExamTestDetailService } from '../../../../_services/examTestDetail.service';
import { ExamTestDetail } from '../../../../_models/examTestDetail';
import { Subject } from '../../../../_models';

@Component({
  templateUrl: 'in-de-thi.component.html'
})

export class InDeThiComponent implements OnInit {
  nameshool: string;
  semeter: number;
  time: number;
  method: string;
  note: string;
  datetest: any;

  examTestId: number;
  examTestParam: any;
  examTestModel: ExamTest = new ExamTest();
  examTestDetailModel: any;
  subjectId: number;
  subjectModel: Subject = new Subject();

  constructor(
    private route: ActivatedRoute,
    private examTestService: ExamTestService,
    private subjectService: SubjectService,
    private examTestDetailSerive: ExamTestDetailService,
    private notifyCenterService: NotifyCenterService) { }

  ngOnInit() {
    this.examTestParam = this.route.params.subscribe(params => {
      this.examTestId = +params['examTestId'];
      this.loadDataExamTest();
      this.loadDataExamTestDetail();
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=50%,left=50%,height=600px,width=600px');
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
      // console.log(this.examTestModel);
      this.subjectService.getSubjectInfoBySubjectId(this.examTestModel.subjectId).subscribe((dataS: any) => {
        this.subjectModel = dataS;
        // console.log(this.subjectModel);
      });
    });
  }

  loadDataExamTestDetail(): void {
    this.examTestDetailSerive.getExamTestDetailById(this.examTestId).subscribe(data => {
      this.examTestDetailModel = data;
      // console.log(this.examTestDetailModel);
    });
  }
}
