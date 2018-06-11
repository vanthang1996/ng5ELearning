import { Department } from './department';

export class Faculty {
  public facultyId: number;
  public facultyName: string;
  public teacherManagementId: number;
  public departments: Array<Department>;
}
