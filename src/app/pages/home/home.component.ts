import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { Task } from '../../core/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedTask: Task | null = null;

  onEdit(task: Task) {
    this.selectedTask = task;
  }

  onSaved() {
    this.selectedTask = null;
  }
}
