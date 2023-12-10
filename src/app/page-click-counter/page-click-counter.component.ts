import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TitleCasePipe } from '@angular/common';
import { Subject, catchError, filter, fromEvent, map, merge, of, pipe, scan, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { DataService } from '../data.service';
import { toSignal, toObservable } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    TitleCasePipe
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
  lastSideClicked$ = toSignal(merge(
    this.leftSideClicks$,
    this.rightSideClicks$
  ).pipe(
    tap(() => this.autoSave && this.saveTrigger.next('autosave')),
    startWith('UNKNOWN')
  ));
  leftSideClickCounter$ = toSignal(this.leftSideClicks$.pipe(counter()), {initialValue: 0});
  rightSideClickCounter$ = toSignal(this.rightSideClicks$.pipe(counter()), {initialValue: 0});

  saveTrigger = new Subject<'manual' | 'autosave'>();

  stateSavedOnServer$ = toSignal(this.saveTrigger.asObservable().pipe(
    withLatestFrom(
      toObservable(this.leftSideClickCounter$),
      toObservable(this.rightSideClickCounter$)
    ),
    switchMap((state) => 
      this.#data.save$(state).pipe(
        catchError(err => of(err))
      )
    ),
    shareReplay()
  ));
  
  ngOnInit() {
    
  }
}
function counter() {
  return pipe(
    scan(acc => acc + 1, 0)
  )
}