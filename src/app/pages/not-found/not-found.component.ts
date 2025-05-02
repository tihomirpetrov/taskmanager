import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButton],
  template: `
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <button mat-raised-button color="primary" routerLink="/" type="button">Go Home</button>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
