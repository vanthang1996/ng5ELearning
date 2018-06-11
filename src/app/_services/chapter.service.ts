import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ChapterService {

  constructor(private http: HttpClient, private config: ConfigValue) { }

  deleteChapterByChapterId(subjectId: number, chapterId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/chapter/delete/${subjectId}/${chapterId}`);
  }
}
