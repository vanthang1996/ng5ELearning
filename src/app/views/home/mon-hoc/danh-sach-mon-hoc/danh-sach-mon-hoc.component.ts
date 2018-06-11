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
  collectionPageIndex;
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
      this.collectionPageIndex = new Array(this.numberOfPage).fill(0);
      // console.log(data);
    });
  }
}
