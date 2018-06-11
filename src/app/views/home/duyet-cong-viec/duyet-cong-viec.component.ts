import { Job } from './../../../_models/job';
import { JobService } from './../../../_services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'duyet-cong-viec.component.html'
})

export class DuyetCongViecComponent implements OnInit {
  jobTypes;
  selectedJobTypeId = 0;
  selectJobStatus = 0;
  jobs;
  jobContentDetail;
  isCreateQuestion;
  questionDetail;
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
    this.jobTypes = this.jobService.getALLJobType();
    this.loadData();
  }
  loadData(): void {
    this.jobService.getListJobByManageTeacher(this.selectedJobTypeId, this.selectJobStatus, this.current_page, this.limit)
      .subscribe((data: any) => {
        this.jobs = data.listOfResult;
        this.numberOfPage = data.numberOfPage;
        this.collectionPageIndex = new Array(this.numberOfPage).fill(0);
        this.numberOfRecord = data.numberOfRecord;
        console.log(data as Object);
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
