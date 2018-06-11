import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../_services/subjectService.service';
import { TeacherService } from '../../../../_services/teacherService.service';
import { JobService } from '../../../../_services/job.service';
import { NotifyCenterService } from '../../../../_services/notify-center.service';
import { Department, Job, Subject } from '../../../../_models';

@Component({
  templateUrl: 'phan-cong-cau-truc.component.html'
})

export class PhanCongCauTrucComponent implements OnInit, OnDestroy {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  departments: any;
  subjects: any;
  selectedDepartment;
  teachers: any;
  selectedTeacher;
  dueDate;
  submit = true;
  selectedSubject;
  jobContent;

  constructor(private _formBuilder: FormBuilder
    , private router: Router
    , private subjectService: SubjectService
    , private teacherService: TeacherService
    , private jobService: JobService
    , private notifyCenterService: NotifyCenterService) {

  }

  ngOnInit() {
    this.formStep();
    this.teacherService.getListDepartmentOfTeacherEmailFromToken().subscribe((data: Department) => this.departments = data);
  }

  ngOnDestroy() { }

  formStep(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  changeDepartment(departmentId: number) {
    departmentId = +departmentId;
    this.selectedDepartment = this.departments.find(department => department.departmentId === departmentId);
    if (this.selectedDepartment) {
      this.subjectService.getSubjectsAddStructureTest(this.selectedDepartment.departmentId).subscribe(
        (data: any) => this.subjects = data
      ); return;
    }
    this.subjects = undefined;
    this.teachers = undefined;
    this.selectedSubject = undefined;
    this.selectedTeacher = undefined;
  }
  changeSubject(subjectId: number) {
    subjectId = +subjectId;
    this.selectedSubject = this.subjects.find(subject => subject.subjectId === subjectId);
    this.subjectService.getSubjectBySubjectId(subjectId).subscribe((data: Subject) => {
      this.teachers = data.teachers;
    });
    this.selectedTeacher = undefined;
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
      && (this.dueDate &&
        this.dueDate !== NaN));
    // console.log('----');
    // console.log(!!(this.selectedDepartment), this.selectedDepartment);
    // console.log(!!(this.selectedSubject), this.selectedSubject);
    // console.log(!!(this.selectedTeacher), this.selectedTeacher);
    // console.log(!!((this.dueDate && this.dueDate !== NaN)), this.dueDate);
    // console.log('----');
    // console.log(this.submit);
  }
  submitForm() {
    this.isSubmit();
    if (!this.submit) {
      const job = new Job();
      job.subjectId = this.selectedSubject.subjectId;
      job.jobContent = this.jobContent || '';
      job.endTime = this.dueDate;
      job.teacherId = this.selectedTeacher.teacherId;
      this.jobService.addStructureTest(job).subscribe((data: any) => {
        this.notifyCenterService.sendNotifyCenter({ massage: data, status: 200, details: null });
      });
    } else {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Không thể nộp!', status: 200, details: null });
    }
  }
}
