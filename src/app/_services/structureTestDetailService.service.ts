import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StrucTestDetail } from './../_models/strucTestDetail';
import { Observable } from 'rxjs/observable';
@Injectable()
export class StructureTestDetailService {
  constructor(private http: HttpClient, private config: ConfigValue) {

  }
  getListStrucBySubjectId(subjectId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/struc-test-detail/${subjectId}`).pipe(map((data: any) => {
      return data;
    }));
  }
  showStrucDetailStatusZero(subjectId: number) {
    return this.http.get(this.config.url_port + `/struc-test-detail/${subjectId}/struc-detail`).pipe(map((data: any) => {
      return data;
    }));
  }

  addstructureTestDetail(structureTestDetail: StrucTestDetail) {
    return this.http.post(this.config.url_port + `/struc-test-detail/edit`, {
      structureTestId: structureTestDetail.structureTestId,
      chapterId: structureTestDetail.chapterId,
      levelId: structureTestDetail.levelId,
      numberOfQuestion: structureTestDetail.numberOfQuestion,
      totalScore: structureTestDetail.totalScore
    });
  }
  updateStatusStrucZero(subjectId: number): Observable<any> {
    return this.http.get(this.config.url_port + `/structure/${subjectId}/submit-struc`);
  }
}
