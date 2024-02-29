import { Injectable } from '@angular/core';
import { INote } from '../models/INote';
import { Observable, of, throwError } from 'rxjs';

const notes: Array<INote> =
  [
    {
      name: 'A',
      isNatural: true,
    },
    {
      name: 'A#',
      alternativeName: 'Bb',
      isNatural: false,
    },
    {
      name: 'B',
      isNatural: true,
    },
    {
      name: 'C',
      isNatural: true,
    },
    {
      name: 'C#',
      alternativeName: 'Db',
      isNatural: false,
    },
    {
      name: 'D',
      isNatural: true,
    },
    {
      name: 'D#',
      alternativeName: 'Eb',
      isNatural: false,
    },
    {
      name: 'E',
      isNatural: true,
    },
    {
      name: 'F',
      isNatural: true,
    },
    {
      name: 'F#',
      alternativeName: 'Gb',
      isNatural: false,
    },
    {
      name: 'G',
      isNatural: true,
    },
    {
      name: 'G#',
      alternativeName: 'Ab',
      isNatural: false
    }
  ];

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNote(noteName: string): Observable<INote> {

    const safe = noteName.toLowerCase();
    let note = notes.find(n => n.name.toLowerCase() == safe || n.alternativeName?.toLowerCase() == safe);
    if (note)
      return of(note);

    return throwError(() => `could not find a note called ${noteName}`);
  }

  getNotes(): Observable<INote[]> {
    return of(notes.map(n => n));
  }
}
