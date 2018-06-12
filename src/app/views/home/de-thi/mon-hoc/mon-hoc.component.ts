import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../../_services/subjectService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../_services/department.service';

@Component({
  templateUrl: 'mon-hoc.component.html'
})

export class MonHocComponent implements OnInit {
  subjectModel: any;
  departmentParam: any;
  departmentId: number;
  departmentModel: any;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.departmentParam = this.route.params.subscribe(params => {
      this.departmentId = +params['departmentId'];
      this.loadDepartment();
      this.loadSubject();
    });
  }

  loadSubject() {
    this.subjectService.getSubjectsByDepartmentId(this.departmentId).subscribe((data: any) => {
      this.subjectModel = data;
      // console.log(this.subjectModel);
    });
  }

  loadDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe((data: any) => {
      this.departmentModel = data;
    });
  }
}
