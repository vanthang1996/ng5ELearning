import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../../_services/faculty.service';
import { TeacherService } from '../../../_services/teacherService.service';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../../_services/department.service';
import { NotifyCenterService } from '../../../_services/notify-center.service';

@Component({
  templateUrl: 'them-bo-mon.component.html'
})

export class ThemBoMonComponent implements OnInit {
  facultyModel: any;
  teacherModel: any;

  constructor(
    private facultyService: FacultyService,
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.getAllFaculty();
    this.getAllTeacher();
  }

  getAllFaculty() {
    this.facultyService.getAllFaculty().subscribe((data: any) => {
      this.facultyModel = data;
    });
  }

  getAllTeacher() {
    this.teacherService.getAllTeacher().subscribe((data: any) => {
      this.teacherModel = data;
    });
  }


  onSubmit(f: NgForm) {
    this.departmentService.createDepartment(f.value).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: data, status: 200, details: null });
    });
  }
}
