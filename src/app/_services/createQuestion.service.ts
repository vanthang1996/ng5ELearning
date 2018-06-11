import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';

@Injectable()
export class CreateQuestionService {

  constructor(private http: HttpClient, private config: ConfigValue) { }

  getCreateQuestionByJobId(jobId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/create-question/${jobId}`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
}
