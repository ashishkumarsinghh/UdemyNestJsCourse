import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks-flter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(t => t.status == status);
    }
    if (search) {
      tasks = tasks.filter(t => {
        if (t.title.includes(search) || t.description.includes(search)) {
          return true;
        }
      });
    }
    return tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find(t => t.id == id);
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id != id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
