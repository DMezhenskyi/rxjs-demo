import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  #http = inject(HttpClient);

  save$([trigger, leftSideClicks, rightSideClicks]: [string, number, number]) {
    const dataToSave = { trigger, data: { leftSideClicks, rightSideClicks }};
    return this.#http.post<{data: any}>(`http://localhost:3000/save`, dataToSave)
      .pipe(
        map(response => ({
          status: 'success',
          data: response.data
        })),
        retry({
          count: 3,
          delay: 1000
        }),
        catchError(() => of({
          status: 'error',
          data: null
        }))
      )
  }
}
