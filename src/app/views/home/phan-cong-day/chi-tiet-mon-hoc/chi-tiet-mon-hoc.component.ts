import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../../../_services/subjectService.service';
import { TeacherService } from '../../../../_services/teacherService.service';
import { Subject, Teacher } from '../../../../_models';
import { NotifyCenterService } from '../../../../_services/notify-center.service';

@Component({
  templateUrl: 'chi-tiet-mon-hoc.component.html'
})

export class ChiTietMonHocComponent implements OnInit {
  subjectParam: any;
  subjectId: number;
  subjectModel: any;
  teacherModel: any;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.subjectParam = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadSubject();
    });
  }

  loadSubject() {
    this.subjectService.getSubjectInfoBySubjectId(this.subjectId).subscribe((data: any) => {
      this.subjectModel = data;
      console.log(this.subjectModel);

      // laasy dc ma bo mon trong moon hojc ne
      // ở dây lấy dc mã môn, ma bô môn
      //  gọi lên đưa 2 mã đó vào là ra danh sách giảng viên thuộc bộ môn, nhưng chưa có tham gia dạy môn đó
      this.teacherService.getTeacherInDepartmentNotInSubject(this.subjectModel.departmentId, this.subjectModel.subjectId)
        .subscribe((dataT: any) => {
          this.teacherModel = dataT;
          console.log(this.teacherModel);
      });
    });
  }

  addTeacherToSubject(teacherId: number, subjectId: number) {
    this.teacherService.insertQLMH(teacherId, subjectId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
      this.loadSubject();
    });
  }

  deleteTeacherToSubject(teacherId: number, subjectId: number) {
    this.teacherService.deleteQLMH(teacherId, subjectId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
      this.loadSubject();
    });
  }

}
