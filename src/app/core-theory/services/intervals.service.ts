import { Injectable } from '@angular/core';
import { IInterval } from '../models/IInterval';
import { Observable, of } from 'rxjs';

const intervals: Array<IInterval> = [
  { distanceInHalfTones: 0, name: 'tonic', symbol: '1' },
  { distanceInHalfTones: 1, name: 'minor second', symbol: 'b2' },
  { distanceInHalfTones: 2, name: 'major second', symbol: '2' },
  { distanceInHalfTones: 3, name: 'minor third', symbol: 'b3' },
  { distanceInHalfTones: 4, name: 'major third', symbol: '3' },
  { distanceInHalfTones: 5, name: 'perfect fourth', symbol: '4' },
  { distanceInHalfTones: 6, name: 'tritone', symbol: '4# / b5' },
  { distanceInHalfTones: 7, name: 'perfect fifth', symbol: '5' },
  { distanceInHalfTones: 8, name: 'minor sixth', symbol: 'b6' },
  { distanceInHalfTones: 9, name: 'major sixth', symbol: '6' },
  { distanceInHalfTones: 10, name: 'minor seventh', symbol: 'b7' },
  { distanceInHalfTones: 11, name: 'major seventh', symbol: '7' },
  { distanceInHalfTones: 12, name: 'octave', symbol: '8' },
];

@Injectable({
  providedIn: 'root'
})
export class IntervalsService {

  constructor() { }

  getIntervals(): Observable<Array<IInterval>> {
    return of(intervals);
  }
}
