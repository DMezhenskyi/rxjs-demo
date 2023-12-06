import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, retry, startWith, throwError } from 'rxjs';

export interface Response {
  message: string;
  data: RequestData;
};
export interface State {
  leftSideClicks: number; 
  rightSideClicks: number;
}
export interface RequestData {
  trigger: 'manual' | 'autosave';
  data: State | null;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  #http = inject(HttpClient);

  save$([trigger, leftSideClicks, rightSideClicks]: [RequestData['trigger'], number, number]) {
    const dataToSave: RequestData = { trigger, data: { leftSideClicks, rightSideClicks }};
    return this.#http.post<Response>(`http://localhost:3000/save`, dataToSave)
      .pipe(
        map(response => ({
          status: 'success',
          data: response.data
        })),
        retry({
          count: 3,
          delay: 1000
        }),
        catchError(() => throwError(() => ({
          status: 'error',
          data: null
        }))),
        startWith({
          status: 'loading',
          data: null
        }) 
      )
  }
}
