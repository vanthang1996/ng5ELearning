import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../_services/teacherService.service';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../_services/job.service';
import { CreateQuestionService } from '../../../_services/createQuestion.service';
import { QuestionService } from '../../../_services/questionService.service';
import { locateHostElement } from '@angular/core/src/render3/instructions';

@Component({
  templateUrl: 'duyet-cau-hoi.component.html'
})

export class DuyetCauHoiComponent implements OnInit {
  panelOpenState = false;
  jobModel: any;
  jobId: number;
  jobParam: any;
  message: string;
  createQuestionModel: any;
  questionModel: any;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private createQuestionService: CreateQuestionService,
    private questionService: QuestionService,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.jobParam = this.route.params.subscribe(params => {
      this.jobId = +params['jobId'];
      this.getJob();
      this.getJobByTeacherId();
    });
  }

  getJob() {
    this.jobService.geJobByJobId(this.jobId).subscribe((data: any) => {
      this.jobModel = data;
      console.log(this.jobModel);
      this.questionService.getQuestionByTeacherId(this.jobModel.teacher.teacherId).subscribe((dataq: any) => {
        this.questionModel = dataq;
      });
    });
  }

  getJobByTeacherId() {
    this.createQuestionService.getCreateQuestionByJobId(this.jobId).subscribe((data: any) => {
      this.createQuestionModel = data;
    });
  }
}
