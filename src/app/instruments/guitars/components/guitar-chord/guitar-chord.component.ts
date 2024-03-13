import { Component, Input } from '@angular/core';
import { IGuitar, IGuitarChord, IGuitarChordPosition } from '../../models/IGuitar';
import { INote } from '../../../../core-theory/models/INote';
import { NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../../../core-theory/services/tone.service';

interface IChordGridPosition
{
  note: INote;
  octave: number;
  isBeingPlayed: boolean,
  isOpenString: boolean,
  stringIndex: number,
  adjustedFretIndex: number
}

interface IChordGridStringKey {
  note: INote,
  octave: number
}

@Component({
  selector: 'app-guitar-chord',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './guitar-chord.component.html',
  styleUrl: './guitar-chord.component.scss'
})
export class GuitarChordComponent {
  
  private _guitar?: IGuitar;
  private _chord?: IGuitarChord;
  chordMap?: IChordGridPosition[][];
  stringKeys?: IChordGridStringKey[];

  constructor(private tone: ToneService) {

  }

  @Input() set guitar(value: IGuitar) {
    this._guitar = value;
    this.refreshData();
  }

  get guitar() : IGuitar | undefined {
    return this._guitar;
  }

  @Input() set chord(value: IGuitarChord) {
    this._chord = value;
    this.refreshData();
  }

  get chord() : IGuitarChord | undefined {
    return this._chord;
  }

  playChord() {

    if (!this.chordMap)
      return;

    let notes = this.chordMap
      .reduce((p, c) => p.concat(c), [])
      .filter(t => t.isBeingPlayed)
      .map(t => `${t.note.name}${t.octave}`);
  
    this.tone.playNotesAsChord(notes);
  }

  playNote(position: IChordGridPosition) {

  }

  refreshData() {

    this.chordMap = undefined;

    if (!this.chord) 
      return;

    if (!this.guitar)
      return;

    let minFret: number = this.guitar.fretCount;
    let guitarArray: IChordGridPosition[][] = this.guitar.strings.map((string, stringIndex) => {

      let isRootPlayed = this.chord!.positions.find(position => {
        return position.isOpenString && position.string.openString.name == string.openString.name;
      }) ? true : false

      if (isRootPlayed) 
        minFret = 0;

      return [<IChordGridPosition>{
        note: string.openString,
        octave: string.startOctave,
        isBeingPlayed: isRootPlayed,
        isOpenString: true,
        stringIndex: stringIndex,
        adjustedFretIndex: 0
      }].concat(string.frets.map((fret, fretIndex) => {

        let isFretPlayed = this.chord!.positions.find(position => {
          return position.isOpenString == false && 
            position.string.openString.name == string.openString.name &&
            position.fret?.note.name == fret.note.name && 
            position.fret?.octave == fret.octave
        }) ? true : false;

        let fretAdjustedIndex = fretIndex+1;
        if (isFretPlayed && fretAdjustedIndex < minFret) 
          minFret = fretAdjustedIndex;

        return <IChordGridPosition> {
          note: fret.note,
          octave: fret.octave,
          isBeingPlayed: isFretPlayed,
          isOpenString: false,
          stringIndex: stringIndex,
          adjustedFretIndex: fretAdjustedIndex
        };
      }));
    });

    // root note being saved.
    let filteredGuitar = guitarArray.map(string => {
      return string.slice(minFret, minFret + 4);
    });

    this.chordMap = filteredGuitar;
  }

  readonly viewBoxWidth = 160; // Width of the SVG viewBox
    readonly viewBoxHeight = 120; // Height of the SVG viewBox
    readonly cellWidth = 40; // Width of each cell in the grid
    readonly cellHeight = 20; // Height of each cell in the grid

    getRectX(columnIndex: number): number {
        return columnIndex * this.cellWidth;
    }

    getRectY(rowIndex: number): number {
        return rowIndex * this.cellHeight;
    }

    getTextX(columnIndex: number): number {
        return (columnIndex + 0.5) * this.cellWidth;
    }

    getTextY(rowIndex: number): number {
        return (rowIndex + 0.5) * this.cellHeight;
    }

    getPositionMarker(position: IChordGridPosition): string {
        if (position.note.name == this.chord?.chord.key.name) {
            return 'R'; // Display 'R' for root string
        } else if (position.adjustedFretIndex === 0) {
            return 'O'; // Display 'O' for open string
        } else if (position.isBeingPlayed == false) {
            return 'X'; // Display 'X' for muted string
        } else {
            return (position.adjustedFretIndex + 1).toString() + " " + (position.note.name) // Display fret number
        }
    }

}
