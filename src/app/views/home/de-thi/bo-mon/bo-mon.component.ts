import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../_services/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'bo-mon.component.html'
})

export class BoMonComponent implements OnInit {
  departmentModel: any;

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment() {
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departmentModel = data;
      // console.log(this.departmentModel);
    });
  }
}
