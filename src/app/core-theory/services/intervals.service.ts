import { Injectable } from '@angular/core';
import { IInterval, intervals } from '../models/IInterval';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntervalsService {

  constructor() { }

  getIntervals(): Observable<Array<IInterval>> {
    return of(intervals);
  }
}
