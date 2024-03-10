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

  findChordPositionsNeckSubset(guitar: IGuitar, chord: IChord, yPositionIndex: number): IGuitarChord[] {

    const STRETCH_FRET_COUNT = 4;

    let chordNotes = chord.noteIntervals.map(t => t.note.name.toLowerCase());

    let positions: Array<Array<null | IGuitarChordPosition>> = [];

    // now what I want to play with is a range of frets that we can stretch with
    for (let stretchIndex = 0; stretchIndex < STRETCH_FRET_COUNT; stretchIndex++) {

      // now lets find all the positions that can work in the chord :)
      let currentYPosition = yPositionIndex + stretchIndex;
      if (currentYPosition == 0) {
        // open string
        let stringNotes = guitar.strings.map(string => {
          let indexOf = chordNotes.indexOf(string.openString.name.toLowerCase());
          if (indexOf == -1)
            return null;
          else
            return <IGuitarChordPosition>{
              fret: null,
              string: string,
              isOpenString: true
            };
        });

        positions.push(stringNotes);
      } else {
        // fret position
        let fretIndex = currentYPosition - 1;
        // open string
        let stringNotes = guitar.strings
          .map(string => {
            let fret = string.frets[fretIndex];
            let indexOf = chordNotes.indexOf(fret.note.name.toLowerCase());
            if (indexOf == -1)
              return null;
            else
              return <IGuitarChordPosition>{
                fret: fret,
                string: string,
                isOpenString: false
              };
          });

        positions.push(stringNotes);
      }
    }

    return this.createVariationsFromPositions(chord, positions);
  }

  findChordPositions(guitar: IGuitar, chord: IChord): IGuitarChord[] {

    let numberOfFrets = guitar.fretCount;
    let result: IGuitarChord[] = [];

    // lets add a number and consider the first fret the open string.
    let totalIterations = numberOfFrets + 1;
    for (let i = 0; i < totalIterations; i++) {
      result.concat(this.findChordPositionsNeckSubset(guitar, chord, i));

      // stop at the first one until I can determine its working lol
      break;
    }

    return result;
  }

  createVariationsFromPositions(chord: IChord, positions: (IGuitarChordPosition | null)[][]): IGuitarChord[] {
    return [];
  }
}
