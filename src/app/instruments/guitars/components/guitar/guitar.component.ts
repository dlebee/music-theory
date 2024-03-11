import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INote } from '../../../../core-theory/models/INote';
import { IGuitar, IGuitarFret, IGuitarString } from '../../models/IGuitar';
import { NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../../../core-theory/services/tone.service';

export interface IGuitarPosition
{
  string: IGuitarString,
  isOpenString: boolean,
  fret: IGuitarFret | null
}

export interface IGuitarPositionsDisplay
{
  name: string,
  color: string,
  textColor: string,
  positions: IGuitarPosition[]
}

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.scss'
})
export class GuitarComponent {

  readonly viewBoxWidth = 1500;
  readonly viewBoxHeight = 250;
  readonly viewPaddingY = 20;
  readonly viewPaddingX = 40;

  @Input() guitar: IGuitar | null = null;
  @Input() showNotes: boolean = true;
  @Input() reversed: boolean = false;
  @Input() maxFrets: number | null = null;
  @Input() notes: IGuitarPositionsDisplay[] = []

  @Output() noteClicked = new EventEmitter<{
    note: INote,
    octave: number
  }>();

  constructor(private tone: ToneService) {

  }

  get fretCount() {
    return this.maxFrets ? this.maxFrets : this.guitar?.fretCount ?? 0;
  }

  getFretXPosition(index: number) {

    let positionOfNut = this.viewPaddingX + (this.viewPaddingX * 0.5);
    let widthOfNut = 7;
    let startOfOtherFrets = positionOfNut + widthOfNut;

    if (index == 0)
      return positionOfNut; // Position of the nut
    else {
      let fretSpacingPercentage = 1 - Math.pow(0.943874, index); // Adjust the scale factor as needed
      let result = startOfOtherFrets + fretSpacingPercentage * (this.viewBoxWidth - widthOfNut);
      return result * 1.25;
    }
  }

  getStringYPosition(index: number) {

    const validYSpace = this.viewBoxHeight - (this.viewPaddingY*2);
    const spacePerString = validYSpace / this.guitar!.strings.length;
    return (this.viewPaddingY * 2) + (spacePerString * index);
  }

  emitNoteClicked(note: INote, octave: number) {
    this.tone.playNote(note.name, `${octave}`, "8n");
    this.noteClicked.emit({
      note: note,
      octave: octave
    });
  }

  calculateOctave(startOctave: number, index: number) {
    return startOctave + Math.floor((index + 1) / 12);
  }

  get finalStrings() {
    return this.reversed ?
      this.guitar!.strings.slice().reverse() :
      this.guitar!.strings.slice()
  }

  getOpenStringDisplay(string: IGuitarString) {

    if (!this.notes) {
      return null;
    }

    return this.notes.find(note => {
      return note.positions.find(position => {
        return position.isOpenString && string.openString.name == position.string.openString.name;
      });
    });
  }

  isOpenStringAskedFor(string: IGuitarString) {
    return this.getOpenStringDisplay(string) ? true : false;
  }

  getNoteDisplay(string: IGuitarString, fret: IGuitarFret) {

    if (!this.notes) {
      return null;
    }

    return this.notes.find(note => {
      return note.positions.find(position => {
        return !position.isOpenString && 
          string.openString.name == position.string.openString.name && 
          fret.note.name == position.fret?.note.name &&
          fret.octave == position.fret.octave
      });
    });
  }

  isNoteAskedFor(string: IGuitarString, fret: IGuitarFret) {
    return this.getNoteDisplay(string, fret) ? true : false;
  }
}
