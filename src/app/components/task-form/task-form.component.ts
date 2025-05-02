import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../core/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class TaskFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private taskService: TaskService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      this.taskService.addTask(this.form.value);
      this.form.reset()
    }
  }
}
