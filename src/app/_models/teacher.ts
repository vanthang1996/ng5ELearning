import { Role } from './role';
import { Subject } from './subject';

export class Teacher {
  public teacherId: number;
  public firstName: string;
  public lastName: string;
  public fullName = this.firstName + ' ' + this.lastName;
  public birthDay: Date;
  public email: string;
  public password: string;
  public avatar: string;
  public address: string;
  public phoneNumber: string;
  public sex: boolean;
  public departmentId: number;
  public subjects: Subject[];
  public jobs: any[];
  public role: Role[];

}
