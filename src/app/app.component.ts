import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">RxJS Demo</mat-toolbar>
    <main class="content mat-elevation-z1">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .content {
        height: calc(100vh - 64px - 70px);
        margin: 20px;
        background-color: white;
        padding: 20px;
        border-radius: 12px;
      }
    `,
  ],
})
export class AppComponent {}
