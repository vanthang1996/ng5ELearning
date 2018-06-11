import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../../_services/subjectService.service';
import { TeacherService } from '../../../../_services/teacherService.service';
import { Subject } from '../../../../_models';
import { NotifyCenterService } from '../../../../_services/notify-center.service';

@Component({
  templateUrl: 'chi-tiet-mon-hoc.component.html'
})

export class ChiTietMonHocComponent implements OnInit {
  subjectParam: any;
  subjectId: number;
  departmentParam: any;
  departmentId: number;
  subjectModel: any;
  teacherModel: any;
  subjectAdd: Subject = new Subject();

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.subjectParam = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadTeacherOfSubject();
    });

    this.departmentParam = this.route.params.subscribe(params => {
      this.departmentId = +params['departmentId'];
      this.loadTeacherByDepartmentId();
    });
  }

  loadTeacherOfSubject() {
    this.subjectService.getSubjectBySubjectId(this.subjectId).subscribe((data: any) => {
      this.subjectModel = data;
      console.log(this.subjectModel);
    });
  }

  loadTeacherByDepartmentId() {
    this.teacherService.getTeacherByDepartmentId(this.departmentId).subscribe((data: any) => {
      this.teacherModel = data;
      console.log(this.teacherModel);
    });
  }

  addTeacherIntoSubject(subjectEvent: any, teacherId: number) {
    this.subjectAdd = subjectEvent;
    this.subjectAdd.teacherManagementId = teacherId;
    console.log(this.subjectAdd);
    this.subjectService.createSubject(this.subjectAdd).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Sucess!', status: 200, details: null });
      this.loadTeacherOfSubject();
    });
  }

  deleteTeacherOfSubject(subjectId: number, teacherManagementId: number) {
    this.subjectService.deleteTeacherOfSubject(subjectId, teacherManagementId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Sucess!', status: 200, details: null });
      this.loadTeacherOfSubject();
    });
  }
}
