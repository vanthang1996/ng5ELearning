export class StrucTestDetail {
  public structureTestId: number;
  public chapterId: number;
  public levelId: number;
  public numberOfQuestion: number;
  public totalScore: number;
  public structureTest: any;
  public chapter: any;
  public level: any;
  public isValidate(): boolean {
    return this.structureTestId && this.chapterId && this.levelId && this.numberOfQuestion && (this.totalScore && this.totalScore >= 1);
  }
}
