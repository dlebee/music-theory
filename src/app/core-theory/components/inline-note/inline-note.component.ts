import { Component, Input } from '@angular/core';
import { INote } from '../../models/INote';
import { ToneService } from '../../services/tone.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inline-note',
  standalone: true,
  imports: [NgIf],
  templateUrl: './inline-note.component.html',
  styleUrl: './inline-note.component.scss'
})
export class InlineNoteComponent {

  constructor(private tone: ToneService) {

  }


  @Input() note: INote | undefined;

  playNote() {

    if (this.note)
      this.tone.playNote(this.note.name, "4", "8n");
  }
}
