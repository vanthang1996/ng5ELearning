import { JobService } from './../../../../_services/job.service';
import { Teacher } from './../../../../_models/teacher';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../_services/teacherService.service';
import { Job } from '../../../../_models';

@Component({
  templateUrl: 'chi-tiet.component.html'
})

export class ChiTietComponent implements OnInit {
  questionDetail;
  jobContentDetail: any;
  jobs;
  isCreateQuestion = false;
  //
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collectionPageIndex;
  limit = 3;
  page_show = true;
  movePage(page: number): void {
    this.page_show = false;
    this.current_page = page;
    this.loadData();
    this.page_show = true;
  }
  limitPerPage(limit: number): void {
    this.page_show = false;
    this.limit = limit;
    this.current_page = 1;
    this.loadData();
    this.page_show = true;
  }
  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jobService.getJobsOfTeacher(this.current_page, this.limit).subscribe((data: any) => {
      this.jobs = data.listOfResult;
      this.numberOfPage = data.numberOfPage;
      this.numberOfRecord = data.numberOfRecord;
      this.collectionPageIndex = new Array(this.numberOfPage).fill(0);
    });
  }
  jobDetail(jobId: number) {
    this.isCreateQuestion = false;
    jobId = +jobId;
    this.jobContentDetail = this.jobs.find((job: Job) => job.jobId === jobId);
    if (this.jobContentDetail.jobTypeId === 2) {
      this.questionDetail = this.jobService.getJobQuestionDetail(jobId);
      this.isCreateQuestion = true;
    }
  }
}
