import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StrucTestDetail } from '../../../../_models';
import { StructureTestDetailService } from '../../../../_services/structureTestDetailService.service';
import { NotifyCenterService } from '../../../../_services/notify-center.service';
import { NgForm } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  templateUrl: 'tao-cau-truc.component.html'
})

export class TaoCauTrucComponent implements OnInit {
  subjectId: number;
  subject: any;
  structureTestDetail: any;
  chapter: any;
  totalScore: number;
  numberEasyQuestion: number;
  numberDifficultyQuestion: number;
  // edit
  estructureTestId;
  echapterId;
  enumberOfQuestion;
  etotalScore;
  eselectedLevel;
  addStructureModel: StrucTestDetail = new StrucTestDetail();
  strucTestId;
  // add

  constructor(
    private route: ActivatedRoute,
    private structureTestDetailService: StructureTestDetailService,
    private notifyCenterService: NotifyCenterService) { }

  ngOnInit() {
    //  this.addStructureModel  = new  StrucTestDetail();
    this.subject = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadData();
    });
  }

  loadData(): void {
    this.numberDifficultyQuestion = this.numberEasyQuestion = this.totalScore = 0;
    this.structureTestDetailService.getListStrucBySubjectId(this.subjectId).subscribe(data => {
      this.structureTestDetail = data;

      if (this.structureTestDetail) { this.strucTestId = this.structureTestDetail[0].structureTestId; }
      this.structureTestDetail.filter((x: StrucTestDetail) => x.levelId === 1).forEach((element2: StrucTestDetail) => {
        this.numberDifficultyQuestion += element2.numberOfQuestion;
        this.totalScore += element2.totalScore;
      });
      this.structureTestDetail.filter((x: StrucTestDetail) => x.levelId === 2).forEach((element1: StrucTestDetail) => {
        this.numberEasyQuestion += element1.numberOfQuestion;
        this.totalScore += element1.totalScore;
      });
    });
  }

  // form edit
  submitFormEdit(structureTestId: number, chapterId: number, levelId: number) {
    const std = new StrucTestDetail();
    structureTestId = +structureTestId;
    levelId = +levelId;
    chapterId = +chapterId;
    const tmp = this.structureTestDetail.find(
      (item) => item.structureTestId === structureTestId && item.levelId === levelId && item.chapterId === chapterId
    );
    // console.log(tmp);
    this.structureTestDetailService.addstructureTestDetail(tmp).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: 200, details: null });
      this.loadData();
    });
  }

  // form add
  onSubmit(f: NgForm) {
    console.log(f.value);
    this.addStructureModel.structureTestId = this.strucTestId;
    this.addStructureModel.chapterId = f.value.chapterId;
    this.addStructureModel.levelId = f.value.levelId;
    this.addStructureModel.numberOfQuestion = f.value.numberOfQuestion;
    this.addStructureModel.totalScore = f.value.totalScore;
    console.log(this.addStructureModel);
    this.structureTestDetailService.addstructureTestDetail(this.addStructureModel).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Sucess!', status: 200, details: null });
      this.loadData();
    });
  }
}
