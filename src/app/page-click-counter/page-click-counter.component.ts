import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './page-click-counter.component.html',
  styleUrl: './page-click-counter.component.scss',
})
export class PageClickCounterComponent {}
