import { stat } from 'fs';
import { NotifyCenterService } from './../../../../_services/notify-center.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ChapterDao } from '../../../../_models/chapterdao';

@Component({
  templateUrl: 'tao-de-thi.component.html'
})

export class TaoDeThiComponent implements OnInit {
  panelOpenState = false;
  panelChildOpenState = false;
  structureTestParam: any;
  structureTestId: number;
  examTestModel: any;
  constructor(
    private route: ActivatedRoute,
    private examTestService: ExamTestService,
    private notifyCenterService: NotifyCenterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.structureTestParam = this.route.params.subscribe(params => {
      this.structureTestId = +params['structureTestId'];
      this.loadData();
    });
  }

  loadData() {
    this.examTestService.getExamByStrucId(this.structureTestId).subscribe((data: any) => {
      this.examTestModel = data;
    });
  }

  changeQuestion(chapterDao: ChapterDao) {
    this.examTestService.chapterDaoReset(chapterDao).subscribe((data: any) => {
      chapterDao.questions = data.questions;
    });
  }
  submitExamDao() {
    this.examTestService.submitExamDao(this.examTestModel).subscribe((data: any) => {
      console.log('Id Mã đề thi: ', data);
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
      this.router.navigate(['/de-thi']);
    });
  }
}
