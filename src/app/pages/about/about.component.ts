import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>About</h2>
    <p>This is a simple Task Manager application built with Angular Material.</p>
  `,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {}
