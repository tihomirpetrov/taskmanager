import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
