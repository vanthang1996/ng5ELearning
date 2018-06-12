import { Component, OnInit } from '@angular/core';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../../_services/department.service';
import { ExamTest } from '../../../../_models/examtest';

@Component({
  templateUrl: 'danh-sach-de-thi.component.html'
})

export class DanhSachDeThiComponent implements OnInit {
  subjectId: number;
  subjectModel: any;
  examTestModel: ExamTest = new ExamTest;

  constructor(
    private route: ActivatedRoute,
    private examTestService: ExamTestService
  ) { }

  ngOnInit() {
    this.subjectModel = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      console.log(this.subjectId);
      this.loadData();
    });
  }

  loadData() {
    this.examTestService.getExamTestBySubjectId(this.subjectId).subscribe((data: any) => {
      this.examTestModel = data;
      console.log(this.examTestModel);
    });
  }
}
