import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
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
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class TaskFormComponent implements OnChanges {
  @Input() initialTask: Task | null = null;
  @Output() saved = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private taskService: TaskService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialTask']) {
      if (this.initialTask) {
        this.form.patchValue({
          title: this.initialTask.title,
          description: this.initialTask.description
        });
      } else {
        this.form.reset();
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const values = this.form.value as {title: string; description: string};
      if (this.initialTask) {
        this.taskService.updateTask({ ...this.initialTask, ...values });
      } else {
        this.taskService.addTask(values);
      }
      this.form.reset()
      this.saved.emit();
    }
  }
}
