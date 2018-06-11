import { NotifyCenterService } from './../../../_services/notify-center.service';
import { Question } from './../../../_models/question';
import { Answer } from './../../../_models/answer';
import { QuestionService } from './../../../_services/questionService.service';
import { JobService } from './../../../_services/job.service';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../_services/teacherService.service';
import { max } from 'rxjs/operators';
import { stat } from 'fs';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  templateUrl: 'soan-cau-hoi.component.html'
})

export class SoanCauHoiComponent implements OnInit {
  isTL = true;
  isTN = true;
  numAnswer: Array<Answer>;
  subjects;
  selectedSubject;
  questions;
  subjectId = 0;
  question = new Question();
  contentAnswerTl;
  questionEdit;
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


  constructor(private teacherService: TeacherService
    , private questionService: QuestionService
    , private notifyCenterService: NotifyCenterService) { }

  ngOnInit() {
    this.teacherService.getSubjectOfTeacher().subscribe((data: any) => {
      this.subjects = data;
    });

  }

  openTL(): void {
    this.isTL = false;
    this.isTN = true;
    this.numberQuestion(1);
  }

  openTN(): void {
    this.isTL = true;
    this.isTN = false;
    this.numberQuestion(0);
  }
  numberQuestion(number: number) {
    this.numAnswer = Array(+number).fill(0).map((item, index) => new Answer());
  }
  changeSubject(subjectId: number) {
    this.subjectId = +subjectId;
    this.selectedSubject = this.subjects.find(subject => subject.subjectId === this.subjectId);
    console.log(this.selectedSubject);
    this.loadData();
  }

  loadData() {
    this.question.chapterId = 0;
    this.question.levelId = 1;
    this.questionService.getQuestionOfTeacherCompile(this.subjectId, this.current_page, this.limit)
      .subscribe((data: any) => {
        this.questions = data.listOfResult;
        this.numberOfPage = data.numberOfPage;
        this.numberOfRecord = data.numberOfRecord;
        this.collectionPageShow = this.collectionPage(this.current_page, this.numberOfPage, this.number_showPape);
        console.log(data);
      });
  }
  addQuestion() {
    if (!this.isTL) {
      this.numAnswer[0].correctAnswer = true;
      this.numAnswer[0].content = this.contentAnswerTl;
    }
    if (!this.hasOneAnswerCorrect(this.numAnswer)) {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Phải có ít nhất một đáp án đúng!', status: null, details: null });
      return;
    }
    this.question.answers = this.numAnswer;
    this.questionService.insertQuestion(this.question).subscribe((data: any) => {
      console.log('Dữ liệu:', data);
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
      this.clearModal();
    });
  }
  clearModal() {
    this.numberQuestion(0);
    this.contentAnswerTl = '';
    this.isTL = true;
    this.isTN = true;
    this.question = new Question();
    this.question.chapterId = 0;
    this.question.levelId = 1;
  }
  hasOneAnswerCorrect(answers: Array<Answer>): boolean {
    for (let index = 0; index < answers.length; index++) {
      if (answers[index].correctAnswer) { return true; }
    }
    return false;
  }
  editQuestion(questionId: number) {
    questionId = +questionId;
    this.questionEdit = this.questions.find((question: Question) => question.questionId === questionId);
  }
  deleteQuestion(questionId: number) {
    questionId = +questionId;
    console.log(this.questions.find((question: Question) => question.questionId === questionId));
    this.questionService.deleteQuestionById(questionId).subscribe((data: any) => {
      this.notifyCenterService.sendNotifyCenter({ massage: 'Success!', status: null, details: null });
    });
  }
  updateQuestion() {
    if (this.questionEdit) {
      this.questionService.updateQuestion(this.questionEdit).subscribe((data: any) => {
        console.log(data);
      });
    }
    this.questionEdit = undefined;
  }
}
