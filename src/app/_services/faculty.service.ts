import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
@Injectable()
export class FacultyService {

  constructor(private http: HttpClient, private config: ConfigValue) { }

  getAllFaculty(): Observable<any> {
    return this.http.get(this.config.url_port + `/faculty/all-faculty`).pipe(map(
      (data: any) => data = data ? data : []
    ));
  }
}
