import { NotifyCenterService } from './../../../_services/notify-center.service';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../_services/teacherService.service';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
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
    private jobService: JobService,
    private notifyCenterService: NotifyCenterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jobParam = this.route.params.subscribe(params => {
      this.jobId = +params['jobId'];
      this.getJob();
      this.getJobByTeacherId();
    });
  }
  reviewJobQuestion() {
    this.jobService.reviewJobByJobId(this.jobId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
      this.router.navigate(['/duyet-cong-viec']);
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
