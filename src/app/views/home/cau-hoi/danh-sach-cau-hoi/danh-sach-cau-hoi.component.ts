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
  //
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collectionPageShow;
  limit = 3;
  page_show = true;
  number_showPape = 5; // số button tối đa hiển thị, chọn số lẻ
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

  fillRange(start: number, end: number): Array<number> {
    return Array(end - start + 1).fill(0).map((item, index) => start + index);
  }
  collectionPage(current_page: number, max_numberOfPage: number, number_showPape: number): Array<number> {
    let arrays: any;
    const start = Math.ceil(number_showPape / 2);
    const end = max_numberOfPage - (start - 1);
    if (max_numberOfPage === 0) {
      return this.fillRange(0, 0);
    }
    if (current_page < start) {
      arrays = this.fillRange(1, number_showPape > max_numberOfPage ? max_numberOfPage : number_showPape);
    } else if (current_page > end) {
      arrays = this.fillRange(max_numberOfPage - number_showPape + 1, max_numberOfPage);
    } else {
      arrays = this.fillRange(current_page - (start - 1), current_page + (start - 1));
    } console.log(arrays);
    return arrays;
  }
  /* numberShowPage(index: number, current_page: number, max_numberOfPage): boolean {
    index = +index;
    current_page = +current_page;
    max_numberOfPage = +max_numberOfPage;
    const start = Math.ceil(this.number_showPape / 2);
    const end = max_numberOfPage - (start - 1);
    return (current_page >= start && end >= current_page && Math.abs(current_page - index) < start)
    || (current_page < start && (index <= this.number_showPape))
    || (current_page > end && (index > max_numberOfPage - this.number_showPape));
  } */

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
      this.numberOfRecord = data.numberOfRecord;
      this.collectionPageShow = this.collectionPage(this.current_page, this.numberOfPage, this.number_showPape);
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
