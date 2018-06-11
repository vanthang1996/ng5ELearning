import { Teacher } from './../../../../_models/teacher';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from './../../../../_services/teacherService.service';
import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../_models/department';

@Component({
  templateUrl: 'danh-sach-bo-mon.component.html'
})

export class DanhSachBoMonComponent implements OnInit {
  public departments: Array<Department> = new Array();
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(): void {
    this.teacherService.getListDepartmentOfTeacherEmailFromToken().subscribe((data: Array<Department>) => {
      this.departments = data;
      console.log(this.departments);
    });
  }
  getNameTeacherByTeacherId(teacherId: number): Object {
    return this.teacherService.getTeacherByTeacherIdNoCollection(teacherId).subscribe((data: Teacher) => {
      return data.firstName + ' ' + data.lastName;
    });
  }
}
