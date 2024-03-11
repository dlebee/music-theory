import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NoteIntervalService } from '../../../core-theory/services/note-interval.service';
import { INote } from '../../../core-theory/models/INote';
import { GuitarCategories, GuitarInstruments, IGuitar, IGuitarChord, IGuitarChordPosition, IGuitarString, guitarInstruments } from '../models/IGuitar';
import { Observable, map, of, throwError } from 'rxjs';
import { NoteService } from '../../../core-theory/services/note.service';
import { IChord } from '../../../core-theory/models/IChord';
import { IScale } from '../../../core-theory/models/IScale';
import { IGuitarPosition, IGuitarPositionsDisplay } from '../components/guitar/guitar.component';

export interface GuitarOptions {
  category: GuitarCategories,
  types: GuitarInstruments[]
}

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  constructor(private noteIntervalService: NoteIntervalService,
    private noteService: NoteService) {

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
            definition: definition!,
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

  findChordPositions(guitar: IGuitar, chord: IChord): IGuitarChord[] {

    let chordNotes = chord.noteIntervals.map(t => t.note.name.toLowerCase());
    let fretboard = guitar.strings.map(guitarString => {
      let openStringNote = guitarString.openString.name.toLowerCase();
      //let openStringNoteOrNull = chordNotes.indexOf(openStringNote) == -1 ? null : openStringNote;

      return [openStringNote].concat(
        guitarString.frets.map(fret => {
          let fretNote = fret.note.name.toLowerCase();
          return fretNote;
          //return chordNotes.indexOf(fretNote) == -1 ? null : fretNote;
        })
      );
    });

    let shapes = this.findChordShapes(fretboard, chordNotes);
    console.log('found shapes', shapes);

    let result = shapes.map(shape => {
      return <IGuitarChord>{
        chord: chord,
        positions: shape.reduce<IGuitarChordPosition[]>((list, pos, index) => {

          if (pos == -1)
            return list;

          list.push({
            isOpenString: pos == 0,
            string: guitar.strings[index],
            fret: pos == 0 ? null : guitar.strings[index].frets[pos - 1]
          });
          return list;
        }, [])
      }
    });

    console.log(result);

    return result;
  }

  private findChordShapes(fretboard: string[][], chord: string[]): number[][] {
    let shapes: number[][] = [];

    const generatePathsForString = (stringFrets: string[], startFret: number, chord: string[]): number[] => {
        let validFrets: number[] = [];
        for (let fret = startFret; fret < Math.min(startFret + 4, stringFrets.length); fret++) {
            if (chord.includes(stringFrets[fret]) || fret === startFret) {
                validFrets.push(fret);
            }
        }
        return validFrets;
    };

    const buildShape = (currentShape: number[], stringIndex: number, startFret: number): void => {
        if (stringIndex >= fretboard.length) {
            shapes.push([...currentShape]);
            return;
        }

        let validFrets = generatePathsForString(fretboard[stringIndex], startFret, chord);
        validFrets.forEach(fret => {
            currentShape[stringIndex] = fret;
            buildShape([...currentShape], stringIndex + 1, startFret);
        });
    };

    const isValidShape = (shape: number[]): boolean => {
        let notesInShape = shape.map((fret, stringIndex) => fret !== -1 ? fretboard[stringIndex][fret] : "");
        let uniqueNotes = new Set(notesInShape.filter(note => note !== ""));
        return uniqueNotes.size >= chord.length && chord.every(chordNote => notesInShape.includes(chordNote));
    };

    for (let startFret = 0; startFret <= 12; startFret++) {
        buildShape(new Array(fretboard.length).fill(-1), 0, startFret);
    }

    return shapes.filter(shape => isValidShape(shape));
}

  findScalePositions(guitar: IGuitar, scale: IScale): IGuitarPositionsDisplay {
    let positions: IGuitarPosition[] = [];
    let scaleNotes = scale.noteIntervals.map(t => t.note.name.toLowerCase());

    guitar.strings.forEach(string => {
      if (scaleNotes.includes(string.openString.name.toLowerCase())) {
        positions.push({
          isOpenString: true,
          string: string,
          fret: null
        })
      }

      string.frets.forEach(fret => {
        if (scaleNotes.includes(fret.note.name.toLowerCase())) {
          positions.push({
            string: string,
            isOpenString: false,
            fret: fret
          });
        }
      });
    });

    return {
      name: `${scale.key.name} ${scale.key.alternativeName ?? ""} ${scale.definition.name}`,
      color: 'black',
      textColor: 'white',
      positions: positions
    }
  }
}
