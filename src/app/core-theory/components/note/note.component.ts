import { Component, Input } from '@angular/core';
import { InlineNoteComponent } from '../inline-note/inline-note.component';
import { INote } from '../../models/INote';
import { ToneService } from '../../services/tone.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [InlineNoteComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  constructor(private tone: ToneService) {

  }
  
  @Input() note?: INote;

  playNote() {
    if (this.note)
      this.tone.playNote(this.note.name, "4", "8n");
  }
}
