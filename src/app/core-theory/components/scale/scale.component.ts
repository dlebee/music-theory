import { Component, Input } from '@angular/core';
import { IScale } from '../../models/IScale';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../services/tone.service';
import { RouterModule } from '@angular/router';
import { NoteClockComponent } from '../note-clock/note-clock.component';
import { Observable, of } from 'rxjs';
import { INoteInterval } from '../../models/INoteInterval';
import { NoteIntervalService } from '../../services/note-interval.service';
import { INote } from '../../models/INote';

@Component({
  selector: 'app-scale',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, NoteClockComponent, AsyncPipe],
  templateUrl: './scale.component.html',
  styleUrl: './scale.component.scss'
})
export class ScaleComponent {
  private _scale?: IScale;
  intervals$: Observable<INoteInterval[]> = of([]);
  
  constructor(private tone: ToneService, private noteIntervalService: NoteIntervalService) {

  }

  @Input()
  set scale(value: IScale | undefined) {
    this._scale = value;

    if (value)
      this.intervals$ = this.noteIntervalService.getNoteIntervals(value.key);
  }

  get scale() {
    return this._scale;
  }

  @Input() showClock = true;
  @Input() showDegreesLink = true;

  playNote(noteName: string, nextOctave: boolean = false) {
    this.tone.playNote(noteName, nextOctave ? "5" : "4", "8n");
  }

  isOctave(noteInterval: INoteInterval, noteIntervals: INoteInterval[]) {
    let indexOf = noteIntervals.indexOf(noteInterval);
    let indexOfFirstNoteAfterB = noteIntervals.findIndex(t => t.note.name.charAt(0) > 'B');
    return indexOf >= indexOfFirstNoteAfterB;
  }

  play() {

    if (!this.scale)
      return;

    let indexOfFirstNoteAfterB = this.scale.noteIntervals.findIndex(t => t.note.name.charAt(0) > 'B');
    let index = 0;
    let handler = setInterval(() => {
      
      if (index < this.scale!.noteIntervals.length) {
        let note = this.scale!.noteIntervals[index].note;
        this.playNote(note.name, index >= indexOfFirstNoteAfterB);
      } else {
        clearInterval(handler);
      }

      index++;
    }, 500);
  }

  playReverse() {

    if (!this.scale)
      return;

    let indexOfFirstNoteAfterB = this.scale.noteIntervals.findIndex(t => t.note.name.charAt(0) > 'B');
    let index = this.scale.noteIntervals.length;
    let handler = setInterval(() => {
      
      if (index < this.scale!.noteIntervals.length) {
        let note = this.scale!.noteIntervals[index].note;
        this.playNote(note.name, index >= index);
        if (index == 0) {
          clearInterval(handler);
        }
      }

      index--;
    }, 500);
  }
}
