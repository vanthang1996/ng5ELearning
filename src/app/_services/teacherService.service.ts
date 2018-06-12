import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ConfigValue } from './../_helpers/config-value';
import { Teacher } from '../_models';
import { HttpRequest } from 'selenium-webdriver/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class TeacherService {

    constructor(private http: HttpClient, private config: ConfigValue) {

    }

    getAllTeacher(): Observable<any> {
      return this.http.get(this.config.url_port + `/teacher/all-teacher`).pipe(map(
        (data: any) => data = data ? data : []
      ));
    }

    getListSubjectOfTeacherEmailFromToken(page: number, size: number): Observable<any> {
        return this.http.get(this.config.url_port + `/teacher/subjects?page=${page}&size=${size}`).pipe(map((data: any) => {
            return data;
        }));
    }
    getListSubjectOfTeacherEmailFromToken2(): Observable<any> {
        return this.http.get(this.config.url_port + `/teacher/subjects`).pipe(map((data: any) => {
            return data;
        }));
    }
    getListDepartmentOfTeacherEmailFromToken(): Observable<any> {
        return this.http.get(this.config.url_port + `/teacher/departments`).pipe(catchError(e => {
            // noti .setNOttt
            return Observable.of([]);

        }));
    }
    getTeacherByTeacherIdNoCollection(teacherId: number): Observable<any> {
        return this.http.get(this.config.url_port + `/teacher/${teacherId}`).pipe(map((data: any) => {
            return data;
        }));
    }
    getJobsOfTeacherPaging(page: Number, size: Number): Observable<any> {
        return this.http.get(this.config.url_port + `/teacher/jobs`).pipe(map((data: any) => {
            return data;
        }));
    }
    getSubjectOfTeacher(): Observable<any> {
        return this.http.get(this.config.url_port + `/subject/of-teacher`).pipe(map((data: any) => data ? data : []));
    }

    createTeacher(teacher: Teacher): Observable<any> {
      return this.http.post(this.config.url_port + `/teacher/create`, {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        birthDay: teacher.birthDay,
        email: teacher.email,
        password: teacher.password,
        avatar: teacher.avatar,
        address: teacher.address,
        phoneNumber: teacher.phoneNumber,
        sex: teacher.sex,
        departmentId: teacher.departmentId
      });
    }

    getTeacherByDepartmentId(departmentId: number): Observable<any> {
      return this.http.get(this.config.url_port + `/teacher/department/${departmentId}`).pipe(map(
        (data: any) => data = data ? data : []
      ));
    }

    updateTeacher(teacher: Teacher): Observable<any> {
      return this.http.post(this.config.url_port + `/teacher/update`, {
        teacherId: teacher.teacherId,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        birthDay: teacher.birthDay,
        email: teacher.email,
        avatar: teacher.avatar,
        address: teacher.address,
        phoneNumber: teacher.phoneNumber,
        sex: teacher.sex,
        departmentId: teacher.departmentId
      });
    }

    getTeacherInDepartmentNotInSubject(departmentId: number, subjectId: number): Observable<any> {
      return this.http.get(this.config.url_port + `/teacher/department/${departmentId}/not-in-subject/${subjectId}`).pipe(map(
        (data: any) => data = data ? data : []
      ));
    }

    insertQLMH(teacherId: number, subjectId: number): Observable<any> {
      return this.http.get(this.config.url_port + `/teacher/add-teacher/${teacherId}/subject/${subjectId}`);
    }

    deleteQLMH(teacherId: number, subjectId: number): Observable<any> {
      return this.http.get(this.config.url_port + `/teacher/delete-teacher/${teacherId}/subject/${subjectId}`);
    }
}
