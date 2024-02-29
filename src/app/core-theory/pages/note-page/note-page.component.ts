import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../../models/INote';
import { NoteIntervalService } from '../../services/note-interval.service';
import { INoteInterval } from '../../models/INoteInterval';
import { ToneService } from '../../services/tone.service';
import { ChordsService } from '../../services/chords.service';
import { IChord } from '../../models/IChord';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.scss'
})
export class NotePageComponent implements OnInit{
  note$?: Observable<INote>;
  noteIntervals$?: Observable<INoteInterval[]>;
  chords$?: Observable<IChord[]>;

  constructor(private noteService: NoteService, 
    private noteIntervalService: NoteIntervalService,
    private route: ActivatedRoute,
    private tone: ToneService,
    private chordService: ChordsService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteName = params["note"];
      this.note$ = this.noteService.getNote(noteName);
      this.noteIntervals$ = this.noteIntervalService.getNoteIntervals(noteName);
      this.chords$ = this.chordService.allChords(noteName);
    });
  }

  playNote(noteName: string, nextOctave: boolean = false) {
    this.tone.playNote(noteName, nextOctave ? "5" : "4", "8n");
  }

  playChord(chord: IChord) {
    this.tone.playChord(chord);
  }
}
