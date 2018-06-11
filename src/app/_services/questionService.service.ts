import { Chapter } from './../_models/chapter';
import { Question } from './../_models/question';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
@Injectable()
export class QuestionService {
    getQuestionOfTeacherCompile(subjectId: number, page: number, size: number): Observable<any> {
        subjectId = +subjectId;
        return this.http.get(this.config.url_port + `/question/${subjectId}/of-subject-teacher?page=${page}&size=${size}`).pipe(
            map((data: any) => data ? data : [])
        );
    }
    constructor(private http: HttpClient, private config: ConfigValue) { }
    getListQuestionByChapterIdPaging(chapterId: number, page: number, size: number): Observable<any> {
        return this.http.get(this.config.url_port + `/question/${chapterId}?page=${page}&size=${size}`).pipe(map((data) => data));
    }
    insertQuestion(question: Question): Observable<any> {
        return this.http.post(this.config.url_port + `/question/save`, {
            chapterId: question.chapterId,
            content: question.content,
            levelId: question.levelId,
            answers: question.answers
        });
    }
    deleteQuestionById(questionId: number): Observable<any> {
        questionId = +questionId;
        return this.http.post(this.config.url_port + `/question/delete`, { questionId: questionId });
    }
    updateQuestion(question: Question): Observable<any> {
        return this.http.post(this.config.url_port + `/question/update`, {
            questionId: question.questionId,
            content: question.content,
            chapterId: question.chapterId,
            subjectId: question.subjectId,
            levelId: question.levelId,
            teacherCreateId: question.teacherCreateId,
            status: question.status,
            answers: question.answers
        });
    }

    getQuestionByTeacherId(teacherId: number): Observable<any> {
        return this.http.get(this.config.url_port + `/question/teacher/${teacherId}`).pipe(map(
            (data: any) => data = data ? data : []
        ));
    }
}
