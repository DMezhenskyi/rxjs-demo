import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Subject, filter, fromEvent, map, merge, pipe, scan, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    TitleCasePipe, 
    AsyncPipe
  ],
  templateUrl: './page-click-counter.component.html',
  styleUrl: './page-click-counter.component.scss',
})
export class PageClickCounterComponent {

  autoSave = false;     
  #data = inject(DataService);
  
  clicks$ = fromEvent<PointerEvent>(document, 'click');
  leftSideClicks$ = this.clicks$.pipe(
    filter(e => e.clientX < window.innerWidth / 2),
    map(() => 'left')
  );
  rightSideClicks$ = this.clicks$.pipe(
    filter(e => e.clientX > window.innerWidth / 2),
    map(() => 'right')
  );
  lastSideClicked$ = merge(
    this.leftSideClicks$,
    this.rightSideClicks$
  ).pipe(
    tap(() => this.autoSave && this.saveTrigger.next('autosave')),
    startWith('UNKNOWN')
  );
  leftSideClickCounter$ = this.leftSideClicks$.pipe(counter());
  rightSideClickCounter$ = this.rightSideClicks$.pipe(counter());

  saveTrigger = new Subject<'manual' | 'autosave'>();

  stateSavedOnServer$ = this.saveTrigger.asObservable().pipe(
    withLatestFrom(this.leftSideClickCounter$, this.rightSideClickCounter$),
    switchMap((state) => this.#data.save$(state)),
    shareReplay()
  );
  
  ngOnInit() {
    
  }
}
function counter() {
  return pipe(
    scan(acc => acc + 1, 0),
    startWith(0)
  )
}