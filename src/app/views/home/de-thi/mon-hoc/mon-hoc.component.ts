import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../../_services/subjectService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'mon-hoc.component.html'
})

export class MonHocComponent implements OnInit {
  subject: any;
  departmentId: number;
  department: any;

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.department = this.route.params.subscribe(params => {
      this.departmentId = +params['departmentId'];
      this.loadData();
    });
  }

  loadData() {
    this.subjectService.getSubjectsDataByDepartmentId(this.departmentId).subscribe((data: any) => {
      this.subject = data;
      console.log(this.subject);
    });
  }
}
