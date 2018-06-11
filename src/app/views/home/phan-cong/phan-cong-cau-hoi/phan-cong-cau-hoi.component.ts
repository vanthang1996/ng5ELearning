import { JobService } from './../../../../_services/job.service';
import { TeacherService } from './../../../../_services/teacherService.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Subject, Department, Job } from '../../../../_models';
import { SubjectService } from '../../../../_services/subjectService.service';
import { NotifyCenterService } from '../../../../_services/notify-center.service';

@Component({
  templateUrl: 'phan-cong-cau-hoi.component.html'
})

export class PhanCongCauHoiComponent implements OnInit, OnDestroy {
  jobContent: string;
  dueDate;
  selectedTeacher: any;
  selectedSubject: any;
  teachers: any;
  subjects: any;
  departments: any;
  selectedDepartment: any;
  isLinear: false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  listChapterSelected;
  listChapter;
  submit = true;
  numberQuestion = 1;

  constructor(private _formBuilder: FormBuilder
    , private teacherService: TeacherService
    , private subjectService: SubjectService
    , private notifyCenterService: NotifyCenterService
    , private jobService: JobService) { }

  ngOnInit() {
    this.formSteps();
    this.teacherService.getListDepartmentOfTeacherEmailFromToken().subscribe((data: Department) => this.departments = data);
  }

  formSteps(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy() { }
  changeDepartment(departmentId: number) {
    departmentId = +departmentId;
    this.selectedDepartment = this.departments.find(department => department.departmentId === departmentId);
    if (this.selectedDepartment) {
      this.subjects = this.selectedDepartment['subjects']; return;
    }
    this.subjects = undefined;
    this.teachers = undefined;
    this.selectedSubject = undefined;
    this.selectedTeacher = undefined;
    this.listChapterSelected = undefined;
    this.isSubmit();
  }
  changeSubject(subjectId: number) {
    subjectId = +subjectId;
    this.selectedSubject = this.subjects.find(subject => subject.subjectId === subjectId);
    this.subjectService.getSubjectBySubjectId(subjectId).subscribe((data: Subject) => {
      this.teachers = data.teachers;
      this.listChapter = data.chapters;
    });
    this.selectedTeacher = undefined;
    this.listChapterSelected = undefined;
    this.isSubmit();
  }
  changeTeacher(teacherId: number) {
    teacherId = +  teacherId;
    this.selectedTeacher = this.teachers.find(teacher => teacher.teacherId === teacherId);
    this.isSubmit();
  }
  changeDue(stringDate: string) {
    this.dueDate = new Date(stringDate).valueOf();
    this.isSubmit();
  }

  isSubmit() {
    this.submit = !((this.selectedDepartment)
      && (this.selectedSubject)
      && (this.selectedTeacher)
      && (this.listChapterSelected)
      && (this.numberQuestion >= 0)
      && (this.dueDate &&
        this.dueDate !== NaN));
    // console.log('----');
    // console.log(!!(this.selectedDepartment), this.selectedDepartment);
    // console.log(!!(this.selectedSubject), this.selectedSubject);
    // console.log(!!(this.selectedTeacher), this.selectedTeacher);
    // console.log(!!((this.dueDate && this.dueDate !== NaN)), this.dueDate);
    // console.log(!!(this.listChapterSelected), this.listChapterSelected);
    // console.log(!!(this.numberQuestion >= 1), this.numberQuestion);
    // console.log((!this.submit) ? 'Submit' : 'Can not submit!');
    // console.log('----');
  }
  submitForm() {
    this.isSubmit();
    if (!this.submit) {
      const job = new Job();
      job.subjectId = this.selectedSubject.subjectId;
      job.jobContent = this.jobContent || '';
      job.endTime = this.dueDate;
      job.teacherId = this.selectedTeacher.teacherId;
      this.jobService.jobAddQuestion(job, this.listChapterSelected, this.numberQuestion).subscribe((data: any) => {
        this.notifyCenterService.sendNotifyCenter({ massage: data, status: 200, details: null });
      });
    } else {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Không thể nộp!', status: 200, details: null });
    }
  }
}
