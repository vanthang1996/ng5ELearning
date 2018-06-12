import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyCenterService } from '../../../../_services/notify-center.service';
import { SubjectService } from '../../../../_services/subjectService.service';
import { NgForm } from '@angular/forms';
import { Chapter } from '../../../../_models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChapterService } from '../../../../_services/chapter.service';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';


@Component({
  templateUrl: 'tao-de-cuong.component.html'
})

export class TaoDeCuongComponent implements OnInit {
  subjectId: number;
  subject: any;
  chapters: any;
  panelOpenState = false;
  addChapterModel: Chapter = new Chapter();

  constructor(
    private route: ActivatedRoute,
    private notifyCenterService: NotifyCenterService,
    private subjectService: SubjectService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.subject = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadData();
    });
  }

  loadData() {
    this.subjectService.getListChapterBySubjectId(this.subjectId).subscribe(data => {
      this.chapters = data;
    });
  }

  onSubmit(f: NgForm) {
    this.addChapterModel.chapterName = f.value.chapterName;
    this.addChapterModel.describe = f.value.describe;
    this.addChapterModel.subjectId = this.subjectId;
    this.subjectService.createChapter(this.addChapterModel).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
      this.loadData();
    });
  }
  submitOutLine() {
    this.subjectService.submitSubject(this.subjectId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
      this.router.navigate(['/cong-viec']);
    });
  }

  openDialog(chapterId: number, chapterName: string, subjectId: number): void {
    let dialogRef;

    dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { chapterId: chapterId, chapterName: chapterName, subjectId: subjectId }
    });

    dialogRef.componentInstance.remove.subscribe(($e) => {
      console.log($e);
      this.loadData();
    });
  }
}


@Component({
  templateUrl: 'dialog.html',
})
export class DialogComponent {

  @Output() remove = new EventEmitter<any>();

  constructor(
    private notifyCenterService: NotifyCenterService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private subjectService: SubjectService,
    private chapterService: ChapterService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeChapter(chapterId: number, subjectId: number) {
    this.chapterService.deleteChapterByChapterId(subjectId, chapterId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
      this.remove.emit('xoa');
    });
    this.dialogRef.close();
  }
}
