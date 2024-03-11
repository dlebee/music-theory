import { Injectable } from '@angular/core';
import { NoteIntervalService } from '../../../core-theory/services/note-interval.service';
import { INote } from '../../../core-theory/models/INote';
import { GuitarCategories, GuitarInstruments, IGuitar, IGuitarChord, IGuitarChordPosition, IGuitarString, guitarInstruments } from '../models/IGuitar';
import { Observable, map, of, throwError } from 'rxjs';
import { NoteService } from '../../../core-theory/services/note.service';
import { IChord } from '../../../core-theory/models/IChord';

export interface GuitarOptions {
  category: GuitarCategories,
  types: GuitarInstruments[]
}

interface GuitarPosition {
  stringIndex: number,
  fretIndex: number,
  note: string
}

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  constructor(private noteIntervalService: NoteIntervalService, private noteService: NoteService) {

  }

  options(): Observable<GuitarOptions[]> {
    return of(guitarInstruments.reduce<GuitarOptions[]>((prev, curr) => {
      let existing = prev.find(t => t.category == curr.category);
      if (existing)
        existing.types.push(curr.type);
      else
        prev.push({ category: curr.category, types: [curr.type] });
      return prev;
    }, []));
  }

  createGuitar(type: GuitarInstruments): Observable<IGuitar> {

    let definition = guitarInstruments.find(t => t.type === type);
    if (!definition)
      return throwError(() => `could not find instrument with definition ${type}`);

    return this.noteService.getNotes()
      .pipe(
        map(notes => {

          let guitar: IGuitar = {
            fretCount: definition!.frets,
            strings: definition!.notes.map(noteDefinition => {
              return this.createString(notes.find(t => t.name.toLowerCase() == noteDefinition.note.toLowerCase())!, notes, definition!.frets, noteDefinition.octave);
            })
          };

          return guitar;
        })
      );
  }

  private createString(openStringNote: INote, notes: INote[], fretCount: number, startOctave: number): IGuitarString {

    if (fretCount < 0)
      throw new Error('fretCount must be positive.');

    let ret: IGuitarString = {
      startOctave: startOctave,
      openString: openStringNote,
      frets: []
    };

    let currentNote = openStringNote;
    let currentOctave = openStringNote.name == "B" ? startOctave + 1 : startOctave;
    for (let i = 0; i < fretCount; i++) {
      currentNote = this.noteIntervalService.nextNote(notes, currentNote);



      ret.frets.push({
        note: currentNote,
        octave: currentOctave
      });

      if (currentNote.name == 'B') {
        currentOctave++;
      }
    }

    return ret;
  }

  private findChords(fretboard: string[][], chord: string[]) : GuitarPosition[][] {
    let result: GuitarPosition[][]= [];

    if (0 == fretboard.length)
      return result;

    console.log(fretboard, chord);
    
    let stringCount = fretboard.length;
    console.log('stringCount', stringCount);
    let fretCount = fretboard[0].length;
    let maxFretStretch = 4;

    // number of brute force per fret
    for(let fretIndex = fretCount-1; fretIndex >= 0; fretIndex--) {

      let fretRangeFindings: GuitarPosition[] = [];

      for (let fretStretchIndex = fretIndex, j = 0; fretStretchIndex >= 0 && j < maxFretStretch; fretStretchIndex--, j++) {
        
        // now lets move down with the strings :)
        for (let stringIndex = 0 ; stringIndex < stringCount; stringIndex++) {
          let note = fretboard[stringIndex][fretStretchIndex];
          if (chord.indexOf(note) != -1)
          fretRangeFindings.push({ stringIndex: stringIndex, fretIndex: fretStretchIndex, note: note });
        }
      }

      console.log(fretRangeFindings);
      break;
    }

    return result;
  }

  findChordPositions(guitar: IGuitar, chord: IChord): IGuitarChord[] {

    let result: IGuitarChord[] = [];

    let fretboard = guitar.strings.map(guitarString => {
      return [guitarString.openString.name.toLowerCase()].concat(
        guitarString.frets.map(fret => fret.note.name.toLowerCase())
      );
    });

    let chordNotes = chord.noteIntervals.map(t => t.note.name.toLowerCase());


    let shapes = this.findChords(fretboard, chordNotes);
    console.log(shapes);

    return result;
  }
}
