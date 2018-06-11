import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ConfigValue } from '../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Teacher, Department } from '../../../_models';
import { TeacherService } from '../../../_services/teacherService.service';
import { DepartmentService } from '../../../_services/department.service';
import { NotifyCenterService } from '../../../_services/notify-center.service';

@Component({
  templateUrl: 'cap-nhat-thong-tin.component.html'
})

export class CapNhatThongTinComponent implements OnInit {
  teacherId: number;
  firstName: string;
  lastName: string;
  birthDay: Date;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phoneNumber: string;
  sex: boolean;
  departmentId: number;
  department: Department;
  teacherModel: Teacher;
  url_avatar: string;
  url_avatar_default = 'https://drive.google.com/uc?id=1eYDVkxYb6PkrRaMiR-hATtFBhE7I3f5M';
  submitted = false;
  userform: FormGroup;

  constructor(
    private http: HttpClient,
    private config: ConfigValue,
    private teacherService: TeacherService,
    private departmentService: DepartmentService,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get(this.config.url_port + '/teacher/info').subscribe((token: any) => {
      this.teacherService.getTeacherByTeacherIdNoCollection(token.teacherId).subscribe((data: any) => {
        console.log(data);
        this.teacherId = data.teacherId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.birthDay = data.birthDay;
        this.email = data.email;
        this.password = data.password;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.sex = data.sex;
        this.avatar = data.avatar;
        this.departmentId = data.departmentId;
        this.departmentService.getDepartmentById(this.departmentId).subscribe((dpm: any) => {
          this.department = dpm;
          // console.log(this.department);
        });
      });
    });
  }

  onUploadAvartar(event) {
    if (event.res) {
      const response = event.res.body;
      const data = JSON.parse(response);
      const auth = JSON.parse(data[0].fileProperties);
      console.log(auth.webContentLink);
      this.url_avatar = auth.webContentLink;
      console.log(this.url_avatar);
      this.submitted = false;
    }
    if (event.submitted) {
      // console.log(event);
      this.submitted = !event.submitted.value;
    }
  }

  onSubmit(f: NgForm) {
    this.teacherModel = f.value;
    this.teacherModel.avatar = (this.url_avatar) ? this.url_avatar : this.url_avatar_default;
    // console.log(this.teacherModel);
    this.teacherService.updateTeacher(this.teacherModel).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
    this.getData();
    });
  }
}
