import { Component, OnInit } from '@angular/core';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../../_services/department.service';
import { ExamTest } from '../../../../_models/examtest';
import { SubjectService } from '../../../../_services/subjectService.service';

@Component({
  templateUrl: 'danh-sach-de-thi.component.html'
})

export class DanhSachDeThiComponent implements OnInit {
  subjectId: number;
  subjectParam: any;
  subjectModel: any;

  constructor(
    private route: ActivatedRoute,
    private examTestService: ExamTestService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.subjectParam = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadData();
    });
  }

  loadData() {
    this.subjectService.getSubjectInfoBySubjectId(this.subjectId).subscribe((data: any) => {
      this.subjectModel = data;
      // console.log(this.subjectModel);
    });
  }
}
