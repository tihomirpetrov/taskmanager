import {Injectable} from '@angular/core';
import {Task} from './task.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {
  }

  getTasks(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Omit<Task, 'id' | 'completed'>) {
    this.tasks.push({...task, id: Date.now(), completed: false});
    this.taskSubject.next(this.tasks);
  }

  toggleComplete(id: number) {
    this.tasks = this.tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t
    );
    this.taskSubject.next(this.tasks);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.taskSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    this.taskSubject.next(this.tasks);
  }
}
