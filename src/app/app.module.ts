import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HomeComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  providers: []
})
export class AppModule { }
