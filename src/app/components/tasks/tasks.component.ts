import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {Task} from 'src/app/core/task.model';
import {TaskService} from "../../core/task.service";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['id', 'title', 'description', 'start', 'end', 'completed'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.dataSource.data = tasks;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
