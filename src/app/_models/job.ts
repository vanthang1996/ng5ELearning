import { Teacher } from './teacher';
import { Subject } from './subject';
export class Job {
    jobId: number;
    subjectId: number;
    subject: Subject;
    teacherId: number;
    teacher: Teacher;
    jobTypeId: number;
    jobType: any;
    startTime: Date;
    endTime: Date;
    jobContent;
    status: number;
}
