import { Injectable } from '@angular/core';
import { ChordTypes, IChord, IChordDefinition, chords } from '../models/IChord';
import { INote } from '../models/INote';
import { Observable, map, of, pipe, switchMap, throwError, zip } from 'rxjs';
import { NoteIntervalService } from './note-interval.service';
import { NoteService } from './note.service';
import { safeSemiTone } from '../utils/note.util';
import { arraySameValues } from '../utils/array.util';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {


  constructor(private noteService: NoteService, private noteIntervalService: NoteIntervalService) {

  }

  getDefinitions(): Observable<IChordDefinition[]> {
    return of(chords);
  }

  majorChord(note: INote | string): Observable<IChord> {
    return this.chord(note, ChordTypes.Major);
  }

  minorChord(note: INote | string): Observable<IChord> {
    return this.chord(note, ChordTypes.Minor);
  }

  allChords(note: INote | string): Observable<IChord[]> {
    let definitions = chords.map(cd => this.chord(note, cd.type));
    return zip(...definitions);
  }

  everyChords() {
    return this.noteService.getNotes()
    .pipe(
      switchMap(notes => {

        const notes$$ = notes.map(note => this.allChords(note));
        return zip(...notes$$);
      }),
      map(chords => {
        return chords.reduce((prev, curr) => prev.concat(curr))
      })
    );
  }

  findChords(arrayOfNotes: INote[][]) : Observable<Array<IChord | null>> {

    return this.everyChords().pipe(
      map(chords => {
        return arrayOfNotes.map(potentialChord => {
          return chords.find(chord => {
            return arraySameValues(potentialChord.map(t => t.name), chord.noteIntervals.map(t => t.note.name))
          }) ?? null;
        });
      })
    );

  }

  findChord(notes: INote[]) : Observable<IChord | null> {
    return this.findChords([notes])
      .pipe(map(chords => chords[0]));
  }

  chord(note: INote | string, type: ChordTypes): Observable<IChord> {

    let chordDefinition: IChordDefinition | undefined = chords.find(t => t.type == type);
    if (!chordDefinition) {
      return throwError(() => `could not find chord definition for type ${type}`);
    }

    return this.noteIntervalService.getNoteIntervals(note).pipe(
      map(noteIntervals => {
        let notes = chordDefinition!.semitones.map(s => {
          let finalSemiTone = safeSemiTone(s);
          let noteInterval = noteIntervals.find(ni => ni.distanceInHalfTones == finalSemiTone);
          return noteInterval!;
        });

        let chord: IChord = {
          key: notes[0].note,
          type: type,
          title: chordDefinition!.title,
          chordDefinition: chordDefinition!,
          noteIntervals: notes
        };

        return chord;
      })
    )

  }
}
