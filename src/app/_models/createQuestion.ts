import { Job } from './job';
import { Chapter } from './chapter';

export class CreateQuestion {
  public jobId: number;
  public chapterId: number;
  public amount: number;
  public job: Job;
  public chapter: Chapter;
}
