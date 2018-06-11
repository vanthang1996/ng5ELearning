import { StrucTestDetail } from './../../../_models/strucTestDetail';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StructureTestDetailService } from './../../../_services/structureTestDetailService.service';

@Component({
  templateUrl: 'cau-truc.component.html'
})

export class CauTrucComponent implements OnInit, OnDestroy {

  private sub: any;
  private subjectId: number;
  public strucTestDetails: Array<StrucTestDetail> = new Array();
  public numberOfQuestion = 0;
  numberOfScore = 0;
  numberOfQuestionEasy = 0;


  constructor(private structureTestDetailService: StructureTestDetailService, private route: ActivatedRoute) { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];
      this.loadData();
    });
  }
  loadData(): void {
    this.structureTestDetailService.getListStrucBySubjectId(this.subjectId).subscribe((data: Array<StrucTestDetail>) => {
      this.strucTestDetails = data;
      console.log(data);
      this.strucTestDetails.forEach(value => {
        this.numberOfQuestion += value.numberOfQuestion;
        this.numberOfQuestionEasy += (value.levelId === 2) ? value.numberOfQuestion : 0;
        this.numberOfScore += value.totalScore;
      });
    });
  }
}
