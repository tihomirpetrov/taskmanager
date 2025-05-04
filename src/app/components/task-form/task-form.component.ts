import {Component, inject, effect} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../core/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../core/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  readonly editingTask = this.taskService.selectedTask;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
    effect(() => {
      const t = this.taskService.selectedTask();
      if (t) {
        this.form.patchValue({ title: t.title, description: t.description });
      } else {
        this.form.reset();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      const values = this.form.value as Pick<Task, 'title' | 'description'>;
      const t = this.taskService.selectedTask();
      if (t) {
        this.taskService.updateTask({ ...t, ...values });
        this.taskService.selectedTask.set(null);
      } else {
        this.taskService.addTask(values);
        this.form.reset();
      }
    }
  }
}
