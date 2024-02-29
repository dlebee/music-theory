import { Injectable } from '@angular/core';
import { INote, notes } from '../models/INote';
import { Observable, of, throwError } from 'rxjs';

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
