import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { ExamTest } from '../_models/examtest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { ChapterDao } from '../_models/chapterdao';
@Injectable()
export class ExamTestService {
  submitExamDao(examDao: any): Observable<any> {
    return this.http.post(this.config.url_port + `/exam-test/submit`, examDao);
  }


  chapterDaoReset(chapterDao: ChapterDao): Observable<any> {
    return this.http.post(this.config.url_port + `/structure/chapter-dao`, chapterDao).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
  constructor(private http: HttpClient, private config: ConfigValue) { }

  getExamTestById(examTestId: number) {
    return this.http.get(this.config.url_port + `/exam-test/${examTestId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }

  getExamTestBySubjectId(subjectId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/exam-test/subject/${subjectId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }

  getExamByStrucId(strucTestId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/create-exam/getExam/${strucTestId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
}
