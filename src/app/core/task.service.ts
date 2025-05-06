import {Injectable, signal} from '@angular/core';
import {Task} from './task.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  selectedTask = signal<Task | null>(null);
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
      this.taskSubject.next(this.tasks);
    }
  }

  getTasks(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Omit<Task, 'id' | 'completed' | 'start' | 'end'>) {
    this.tasks.push({...task, id: Date.now(), start: new Date(), end: new Date(), completed: false});
    this.taskSubject.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  toggleComplete(id: number) {
    this.tasks = this.tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t
    );
    this.taskSubject.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.taskSubject.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    this.taskSubject.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
