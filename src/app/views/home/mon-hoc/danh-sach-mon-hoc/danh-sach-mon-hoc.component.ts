import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from './../../../../_services/teacherService.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../../_models/subject';
@Component({
  templateUrl: 'danh-sach-mon-hoc.component.html'
})


export class DanhSachMonHocComponent implements OnInit {
  subjects: Array<Subject>;
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
  constructor(private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.teacherService.getListSubjectOfTeacherEmailFromToken(this.current_page, this.limit).subscribe((data: any) => {
      this.subjects = data.listOfResult;
      this.numberOfPage = data.numberOfPage;
      this.numberOfRecord = data.numberOfRecord;
      this.collectionPageShow = this.collectionPage(this.current_page, this.numberOfPage, this.number_showPape);
      // console.log(data);
    });
  }
}
