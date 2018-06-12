import { Job } from './../_models/job';
import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
@Injectable()
export class JobService {
  getJobQuestionDetail(jobId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/${jobId}/question-detail`);
  }
  getALLJobType(): Observable<any> {
    return this.http.get(this.config.url_port + '/job-type/all');
  }
  /**
       * status [0,1]
       *
       * @return an `Observable` of the body as an `Object`.
       */
  getListJobByManageTeacher(jobTypeId: number, status: number, current_page: number, limit: number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/browse-job/${jobTypeId}/${status}?page=${current_page}&size=${limit}`);
  }
  constructor(private http: HttpClient, private config: ConfigValue) { }
  addOutLine(job: Job): Observable<any> {
    return this.http.post(this.config.url_port + `/job/add-out-line`, {
      subjectId: job.subjectId,
      teacherId: job.teacherId,
      jobContent: job.jobContent,
      endTime: job.endTime
    });
  }
  addStructureTest(job: Job): Observable<any> {
    return this.http.post(this.config.url_port + `/job/add-structure-test`, {
      subjectId: job.subjectId,
      teacherId: job.teacherId,
      jobContent: job.jobContent,
      endTime: job.endTime
    });
  }
  jobAddQuestion(job: Job, listChapter: any, numberQuestion: number): Observable<any> {
    return this.http.post(this.config.url_port +
      `/job/add-question?listChapter=${(listChapter)}&numberQuestion=${numberQuestion}`, {
        subjectId: job.subjectId,
        teacherId: job.teacherId,
        jobContent: job.jobContent,
        endTime: job.endTime
      });
  }
  getJobsOfTeacher(page: Number, size: Number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/teacher`);
  }

  geJobByJobId(jobId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/${jobId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
  reviewJobByJobId(jobId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/review-job/${jobId}`);
  }
  submitJobByJobId(jobId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/job/submit-job/${jobId}`);
  }
}
