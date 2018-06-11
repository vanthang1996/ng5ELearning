export class Role {
  public roleID: string;
  public roleName: string;

  constructor(roleID: string) {
    this.roleID = roleID;
    this.getRoleName();
  }
  getRoleName(): void {
    switch (this.roleID) {
      case 'GV': this.roleName = 'Giảng Viên'; break;
      case 'TBM': this.roleName = 'Trưởng Bộ Môn'; break;
      case 'TK': this.roleName = 'Trưởng Khoa'; break;
    }
  }
  toString(): string {
    return '[Role roleID=' + this.roleID + ', roleName=' + this.roleName + ']';
  }


}
