import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    TitleCasePipe
  ],
  templateUrl: './page-click-counter.component.html',
  styleUrl: './page-click-counter.component.scss',
})
export class PageClickCounterComponent {

  autoSave = false;

  /** 1. Create an Observable of page clicks: clicks$ */ 
  /** 2. Use the Observable above to create 2 others: */
  /**     a) leftSideClicks$ - clicks on the left side of the page (document); */
  /**     b) rightSideClicks$ - clicks on the right side of the page (document); */
  /** 3. Map events in leftSideClicks$ to a string 'left'; */
  /** 4. Map events in rightSideClicks$ to a string 'right'; */
  /** 5. In template instead of hard-coded 'UNKNOWN', display page side that was clicked the last time; */
  /** 6. Configure the initial value for the observable as a string 'UNKNOWN' */
  /** 7. Implement click counters for both sides and display them in component template */
  
  ngOnInit() {
    
  }
}
