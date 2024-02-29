import { Injectable } from '@angular/core';
import { INote } from '../models/INote';
import { IntervalsService } from './intervals.service';
import { NoteService } from './note.service';
import { Observable, combineLatest, map, throwError } from 'rxjs';
import { INoteInterval } from '../models/INoteInterval';

@Injectable({
  providedIn: 'root'
})
export class NoteIntervalService {

  constructor(private notesService: NoteService, private intervalService: IntervalsService) {

  }

  nextNote(notes: INote[], note: INote): INote {

    if (notes.length == 0)
      throw new Error('cannot send an array of notes that is empty.');

    let noteIndex = notes.indexOf(note);
    if (noteIndex + 1 < notes.length)
      return notes[noteIndex + 1];

    return notes[0];
  }

  getNoteIntervals(note: INote | string): Observable<INoteInterval[]> {
    return combineLatest([this.notesService.getNotes(), this.intervalService.getIntervals()])
      .pipe(
        map(pair => {

          const [notes, intervals] = pair;

          let noteName: string = typeof note == "object" ? (note as INote).name : note as string;
          let currentNote = notes.find(t => t.name == noteName);
          if (!currentNote) {
            throw Error(`could not find note ${noteName}`);
          }

          let noteIntervals = intervals.map(i => {
            let noteInterval: INoteInterval = { ...i, note: currentNote! };
            currentNote = this.nextNote(notes, currentNote!);
            return noteInterval;
          });

          return noteIntervals;
        })
      );
  }
}
