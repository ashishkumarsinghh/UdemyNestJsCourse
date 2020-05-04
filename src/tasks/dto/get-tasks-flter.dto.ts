import { TaskStatus } from '../task.model';
export class GetTasksDto {
  status: TaskStatus;
  search: string;
}
