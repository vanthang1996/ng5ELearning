import { Component, OnInit } from '@angular/core';
import { ExamTestService } from '../../../../_services/examtest.service';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../../_services/department.service';
import { SubjectService } from '../../../../_services/subjectService.service';

@Component({
  templateUrl: 'danh-sach-de-thi.component.html'
})

export class DanhSachDeThiComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
  }

  loadData() {
  }
}
