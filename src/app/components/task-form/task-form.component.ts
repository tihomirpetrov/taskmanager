import {Component, inject, effect} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../core/task.service';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Task} from '../../core/task.model';
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
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
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null)
    });
    effect(() => {
      const t = this.taskService.selectedTask();
      if (t) {
        this.form.patchValue({title: t.title, description: t.description, start: t.start, end: t.end});
      } else {
        this.form.reset();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      const values = this.form.value as Pick<Task, 'title' | 'description' | 'start' | 'end'>;
      const t = this.taskService.selectedTask();
      if (t) {
        this.taskService.updateTask({...t, ...values});
        this.taskService.selectedTask.set(null);
      } else {
        this.taskService.addTask(values);
        this.form.reset();
      }
    }
  }
}
