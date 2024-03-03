import { Component, Input } from '@angular/core';
import { IChord } from '../../models/IChord';
import { ToneService } from '../../services/tone.service';
import { NoteIntervalService } from '../../services/note-interval.service';
import { Observable, of } from 'rxjs';
import { INoteInterval } from '../../models/INoteInterval';
import { InlineNoteComponent } from '../inline-note/inline-note.component';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { NoteComponent } from '../note/note.component';
import { NoteClockComponent } from '../note-clock/note-clock.component';

@Component({
  selector: 'app-chord',
  standalone: true,
  imports: [InlineNoteComponent, NoteComponent, NgIf, NgFor, AsyncPipe, NoteClockComponent, JsonPipe],
  templateUrl: './chord.component.html',
  styleUrl: './chord.component.scss'
})
export class ChordComponent {

  private _chord?: IChord;
  intervals$: Observable<INoteInterval[]> = of([]);

  constructor(private tone: ToneService, private intervalService: NoteIntervalService) {
    
  }

  @Input()
  set chord(value: IChord | undefined) {
    this._chord = value;

    if (value)
      this.intervals$ = this.intervalService.getNoteIntervals(value.key);
  }

  get chord() {
    return this._chord;
  }

  play() {
    if (this._chord)
      this.tone.playChord(this._chord);
  }
}
