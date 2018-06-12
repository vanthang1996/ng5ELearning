import { Subject } from './../_models/subject';
import { map } from 'rxjs/operators';
import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import { Chapter } from '../_models';
import { Observable } from 'rxjs/observable';
@Injectable()
export class SubjectService {

  constructor(private http: HttpClient, private config: ConfigValue) {
  }

  getChaptersBySubjectId(subjectId: number, page: number, size: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/${subjectId}/chapter?page=${page}&size=${size}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
  getSubjectBySubjectId(subjectId: number): Observable<Subject> {
    return this.http.get(this.config.url_port + `/subject/${subjectId}`).pipe(map((data: any) => data = data ? data : []));
  }
  getSubjectsAddOutLine(departmentId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/${departmentId}/add-out-line/subjects`).pipe(
      map(data => data = data ? data : [])
    );
  }
  getSubjectsAddStructureTest(departmentId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/${departmentId}/add-structure-test/subjects`).pipe(
      map(data => data = data ? data : [])
    );
  }

  getListChapterBySubjectId(subjectId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/chapter/${subjectId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }

  createChapter(chapter: Chapter): Observable<any> {
    return this.http.post(this.config.url_port + `/chapter/create`, {
      chapterName: chapter.chapterName,
      describe: chapter.describe,
      subjectId: chapter.subjectId
    });
  }

  getSubjectsDataByDepartmentId(departmentId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/${departmentId}/subjects`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }

  createSubject(subject: Subject): Observable<any> {
    return this.http.post(this.config.url_port + `/subject/create`, {
      subjectName: subject.subjectName,
      departmentId: subject.departmentId,
      teacherManagementId: subject.teacherManagementId
    });
  }

  deleteTeacherOfSubject(subjectId: number, teacherManagementId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/delete/${subjectId}/${teacherManagementId}`);
  }

  getSubjectsByDepartmentId(departmentId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/subject/department/${departmentId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
  getSubjectInfoBySubjectId(subjectId: number): Observable<Subject> {
    return this.http.get(this.config.url_port + `/subject/${subjectId}/info`).pipe(map((data: any) => data = data ? data : []));
  }
}
