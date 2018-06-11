import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './../../../../_services/questionService.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  templateUrl: 'danh-sach-cau-hoi.component.html'
})

export class DanhSachCauHoiComponent implements OnInit, OnDestroy {
  chapterId: number;
  sub;
  questions: Array<any>;
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collection_page;
  limit = 3;
  page_show = true;
  movePage(page: number): void {
    this.page_show = false;
    this.current_page = page;
    this.loadData();
    this.page_show = true;
  }
  limitPerPage(limit: number): void {
    this.page_show = false;
    this.limit = limit;
    this.current_page = 1;
    this.loadData();
    this.page_show = true;
  }
  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.chapterId = +params['chapterId'];
      this.loadData();
    });

  }
  loadData(): void {
    this.questionService.getListQuestionByChapterIdPaging(this.chapterId, this.current_page, this.limit).subscribe((data: any) => {
      this.questions = data.listOfResult;
      this.numberOfPage = data.numberOfPage;
      this.collection_page = new Array(this.numberOfPage).fill(5);
      console.log(this.collection_page);
      this.numberOfRecord = data.numberOfRecord;
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
