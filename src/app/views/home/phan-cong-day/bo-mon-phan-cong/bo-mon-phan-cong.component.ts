import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../_services/department.service';

@Component({
  templateUrl: 'bo-mon-phan-cong.component.html'
})

export class BoMonPhanCongComponent implements OnInit {
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
      console.log(this.departmentModel);
    });
  }
}
