import { Chapter } from './../../../../_models/chapter';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, PipeTransform } from '@angular/core';
import { SubjectService } from '../../../../_services/subjectService.service';

@Component({
  templateUrl: 'xem-de-cuong.component.html'
})

export class XemDeCuongComponent implements OnInit, OnDestroy {
  currentPage = 1;
  size = 10;
  numberOfRecord = 0;
  numberOfPage = 0;


  subjectId: number;
  private sub: any;
  public chapters: Array<Chapter>;
  // public chapterIsSelected: Chapter = new Chapter();

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  constructor(private route: ActivatedRoute,
    private subjectService: SubjectService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadData();
    });
  }

  loadData() {
    this.subjectService.getChaptersBySubjectId(this.subjectId, this.currentPage, this.size).subscribe((data: any) => {
      console.log(data);
      this.chapters = data.listOfResult;
      this.numberOfPage = data.numberOfPage;
      this.numberOfRecord = data.numberOfRecord;
    });
  }
  // loadDataQuestions(chapterId: number): void {
  //   console.log('loadDataQuestions(chpaterId: ' + chapterId + ')');
  //   this.chapterIsSelected = this.transform(chapterId, this.chapters);
  //   console.log(this.chapterIsSelected);
  // }
  // transform(term: any, items: any[]): any {
  //   return items.filter((item: Chapter) =>
  //     item.chapterId === term
  //   );
  // }
}
