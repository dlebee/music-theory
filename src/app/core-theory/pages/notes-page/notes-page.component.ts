import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToneService } from '../../services/tone.service';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss'
})
export class NotesPageComponent {
  constructor(public noteService: NoteService, private toneService: ToneService) {

  }

  playNote(note: string) {
    this.toneService.playNote(note, "4", "8n");
  }
}
