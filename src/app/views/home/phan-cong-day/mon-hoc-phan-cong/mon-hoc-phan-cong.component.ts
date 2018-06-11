import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../../_services/subjectService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'mon-hoc-phan-cong.component.html'
})

export class MonHocPhanCongComponent implements OnInit {
  subjectModel: any;
  departmentParam: any;
  departmentId: number;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.departmentParam = this.route.params.subscribe(params => {
      this.departmentId = +params['departmentId'];
      this.loadSubject();
    });
  }

  loadSubject() {
    this.subjectService.getSubjectsDataByDepartmentId(this.departmentId).subscribe((data: any) => {
      this.subjectModel = data;
      // console.log(this.subjectModel);
    });
  }
}
