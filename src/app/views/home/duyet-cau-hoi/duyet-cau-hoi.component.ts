import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../_services/teacherService.service';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../_services/job.service';
import { CreateQuestionService } from '../../../_services/createQuestion.service';
import { QuestionService } from '../../../_services/questionService.service';

@Component({
  templateUrl: 'duyet-cau-hoi.component.html'
})

export class DuyetCauHoiComponent implements OnInit {
  panelOpenState = false;
  teacherModel: any;
  teacher: any;
  teacherId: number;
  jobModel: any;
  jobId: number;
  createQuestionModel: any;
  questionModel: any;
  message: string;
  checkJob = false;
  answerSmall = true;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private createQuestionService: CreateQuestionService,
    private questionService: QuestionService,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.teacher = this.route.params.subscribe(params => {
      this.teacherId = +params['teacherId'];
      this.getTeacherByTeacherId();
      this.getJobByTeacherId();
      this.getCreateQuestionByJobId();
    });
  }

  getTeacherByTeacherId() {
    this.teacherService.getTeacherByTeacherIdNoCollection(this.teacherId).subscribe((data: any) => {
      this.teacherModel = data;
    });
  }

  getJobByTeacherId() {
    this.jobService.geJobByTeacherIdAndJobType(this.teacherId).subscribe((data: any) => {
      this.jobModel = data;
      this.jobId = this.jobModel.jobId;
      if (this.jobId > 0) {
        this.checkJob = true;
        this.createQuestionService.getCreateQuestionByJobId(this.jobId).subscribe((dataCQ: any) => {
          this.createQuestionModel = dataCQ;
        });
      } else {
        this.checkJob = false;
        this.message = 'Người này không có công việc phân công!';
      }
    });
  }

  getCreateQuestionByJobId() {
    this.questionService.getQuestionByTeacherId(this.teacherId).subscribe((data: any) => {
      this.questionModel = data;
    });
  }
}
