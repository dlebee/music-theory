import { Component, Input } from '@angular/core';
import { INoteInterval } from '../../models/INoteInterval';
import { NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../services/tone.service';
import { InlineNoteComponent } from '../inline-note/inline-note.component';

@Component({
  selector: 'app-note-clock',
  standalone: true,
  imports: [NgFor, NgIf, InlineNoteComponent],
  templateUrl: './note-clock.component.html',
  styleUrl: './note-clock.component.scss'
})
export class NoteClockComponent {

  constructor(private tone: ToneService) {

  }

  @Input() intervals: INoteInterval[] = [];

  playNote(note: string) {
    this.tone.playNote(note, "4", "8n");
  }
}
