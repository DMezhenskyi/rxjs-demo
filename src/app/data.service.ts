import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

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
