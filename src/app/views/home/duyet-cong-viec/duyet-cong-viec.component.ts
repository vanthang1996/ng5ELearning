import { stat } from 'fs';
import { NotifyCenterService } from './../../../_services/notify-center.service';
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
  //
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collectionPageShow;
  limit = 3;
  page_show = true;
  number_showPape = 5; // số button tối đa hiển thị, chọn số lẻ
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

  fillRange(start: number, end: number): Array<number> {
    return Array(end - start + 1).fill(0).map((item, index) => start + index);
  }
  collectionPage(current_page: number, max_numberOfPage: number, number_showPape: number): Array<number> {
    let arrays: any;
    const start = Math.ceil(number_showPape / 2);
    const end = max_numberOfPage - (start - 1);
    if (current_page < start) {
      arrays = this.fillRange(1, number_showPape > max_numberOfPage ? max_numberOfPage : number_showPape);
    } else if (current_page > end) {
      arrays = this.fillRange(max_numberOfPage - number_showPape + 1, max_numberOfPage);
    } else {
      arrays = this.fillRange(current_page - (start - 1), current_page + (start - 1));
    } console.log(arrays);
    return arrays;
  }
  constructor(private jobService: JobService, private notifyCenterService: NotifyCenterService) { }

  ngOnInit() {
    this.jobTypes = this.jobService.getALLJobType();
    this.loadData();
  }
  loadData(): void {
    this.jobService.getListJobByManageTeacher(this.selectedJobTypeId, this.selectJobStatus, this.current_page, this.limit)
      .subscribe((data: any) => {
        this.jobs = data.listOfResult;
        this.numberOfPage = data.numberOfPage;
        this.numberOfRecord = data.numberOfRecord;
        this.collectionPageShow = this.collectionPage(this.current_page, this.numberOfPage, this.number_showPape);
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
  reviewJob(jobId: number) {
    jobId = +jobId;
    this.jobService.reviewJobByJobId(jobId).subscribe((data) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
      this.current_page = 1;
      this.loadData();
    });
  }
}
