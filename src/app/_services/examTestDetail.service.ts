import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
@Injectable()
export class ExamTestDetailService {

  constructor(private http: HttpClient, private config: ConfigValue) { }

  getExamTestDetailById(examTestId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/exam-test/detail/${examTestId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
}
