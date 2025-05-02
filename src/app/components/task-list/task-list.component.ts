import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from 'src/app/core/task.model';
import {TaskService} from '../../core/task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
})
export class TaskListComponent implements OnInit {
  @Output() edit = new EventEmitter<Task>();
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggle(id: number) {
    this.taskService.toggleComplete(id);
  }

  remove(id: number) {
    this.taskService.deleteTask(id);
  }

  editTask(task: Task) {
    this.edit.emit(task);
  }
}
