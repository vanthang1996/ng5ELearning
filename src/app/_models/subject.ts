import { Teacher } from './teacher';
export class Subject {
    public subjectId: number;
    public subjectName: string;
    public departmentId: number;
    public teacherManagementId: number;
    public status: number;
    public teacherManagement: Teacher;
    public structureTest: any;
    public examTests: any[];
    public chapters: any[];
    public questions: any[];
    public teachers: any[];
}
