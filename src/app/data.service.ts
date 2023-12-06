import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

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

  save$(data: [string, number, number]) {
    const dataToSave = { };
    return of(dataToSave);
  }
}
