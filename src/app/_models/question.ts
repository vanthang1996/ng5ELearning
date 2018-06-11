import { Answer } from './answer';
import { Teacher } from './teacher';
import { Chapter } from './chapter';
import { Subject } from './subject';

export class Question {
    questionId: number;
    content: string;
    chapterId: number;
    subjectId: number;
    levelId: number;
    teacherCreateId: number;
    status: number;
    chapter: Chapter;
    subject: Subject;
    level: any;
    teacher: Teacher;
    answers: Array<Answer>;
}
