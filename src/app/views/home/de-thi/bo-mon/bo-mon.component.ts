import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../_services/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'bo-mon.component.html'
})

export class BoMonComponent implements OnInit {
  departmentModel: any;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departmentModel = data;
    });
  }
}
