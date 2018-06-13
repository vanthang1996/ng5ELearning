import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private examTestService: ExamTestService
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
      console.log(this.examTestModel);

    });
  }

  changeQuestion(chapterDao: ChapterDao) {
    this.examTestService.chapterDaoReset(chapterDao).subscribe((data: any) => {
      chapterDao.questions = data.questions;
    });
  }
}
