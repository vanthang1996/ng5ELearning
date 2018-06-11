import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../_services/teacherService.service';
import { DepartmentService } from '../../../_services/department.service';
import { NgForm } from '@angular/forms';
import { Subject, Teacher } from '../../../_models';
import { NotifyCenterService } from '../../../_services/notify-center.service';
import { SubjectService } from '../../../_services/subjectService.service';

@Component({
  templateUrl: 'them-mon-hoc.component.html'
})

export class ThemMonHocComponent implements OnInit {
  teacherModel: any;
  departmentModel: any;
  subject: Subject = new Subject();

  constructor(
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private subjectService: SubjectService,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.getAllTeacher();
    this.getAllDepartment();
  }

  getAllTeacher() {
    this.teacherService.getAllTeacher().subscribe((data: any) => {
      this.teacherModel = data;
      // console.log(this.teacherModel);
    });
  }

  getAllDepartment() {
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departmentModel = data;
      // console.log(this.departmentModel);
    });
  }

  onSubmit(f: NgForm) {
    this.subject.subjectName = f.value.subjectName;
    this.subject.departmentId = f.value.department;
    this.subject.teacherManagementId = f.value.teacherManagement;
    this.subjectService.createSubject(this.subject).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
    });
  }
}
