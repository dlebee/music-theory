import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INote } from '../../../../core-theory/models/INote';
import { IGuitar, IGuitarFret, IGuitarString } from '../../models/IGuitar';
import { NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../../../core-theory/services/tone.service';

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.scss'
})
export class GuitarComponent {

  readonly firstFretWidth: number = 1.4312;
  readonly distanceBetweenFrets: number = 1.059463;

  @Input() necksSize: number = 19;
  @Input() guitar: IGuitar | null = null;
  @Input() showNotes: boolean = true;
  @Input() notes: INote[] = [];
  @Input() reversed: boolean = false;
  @Input() maxFrets: number | null = null;

  @Output() noteClicked = new EventEmitter<{
    note: INote,
    octave: number
  }>();

  constructor(private tone: ToneService) {
    
  }

  get fretCount() {
    return this.maxFrets ? this.maxFrets : this.guitar?.fretCount ?? 0;
  }

  getStringWidth(s: IGuitarString) {
    return 0.5 + (0.5 * this.guitar!.strings.indexOf(s)) + 'px';
  }

  getFretWidth(index: number) {

    if (index == 0)
      return '40px';

    let width = this.firstFretWidth;
    for (let i = 2; i <= index; i++) {
      width /= this.distanceBetweenFrets;
    }

    let percentage = width * 100 / this.necksSize;
    return `${percentage}%`;
  }

  emitNoteClicked(note: INote, octave: number) {
    this.tone.playNote(note.name, `${octave}`, "8n");
    this.noteClicked.emit({
      note: note,
      octave: octave
    });
  }

  calculateOctave(startOctave: number, index: number) {
    return startOctave + Math.floor((index+1) / 12);
  }

  get finalStrings() {
    return this.reversed ? 
    this.guitar!.strings.slice().reverse() : 
    this.guitar!.strings.slice()
  }

  isNoteAskedFor(note: INote) {
    return this.notes && this.notes.indexOf(note) > -1;
  }

  showThisNote(note: INote) {
    return this.showNotes ? true : this.isNoteAskedFor(note);
  }
}
