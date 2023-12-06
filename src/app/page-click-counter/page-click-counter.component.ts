import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatDividerModule, MatButtonModule],
  templateUrl: './page-click-counter.component.html',
  styleUrl: './page-click-counter.component.scss',
})
export class PageClickCounterComponent {}
