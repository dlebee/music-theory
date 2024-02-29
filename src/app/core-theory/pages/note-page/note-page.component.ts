import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../../models/INote';
import { NoteIntervalService } from '../../services/note-interval.service';
import { INoteInterval } from '../../models/INoteInterval';

import { Synth } from 'tone/build/esm/instrument/Synth';

const synth = new Synth().toDestination();

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

  constructor(private noteService: NoteService, 
    private noteIntervalService: NoteIntervalService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.note$ = this.noteService.getNote(params["note"]);
      this.noteIntervals$ = this.noteIntervalService.getNoteIntervals(params["note"]);
    });
  }

  playNote(noteName: string, nextOctave: boolean = false) {
    
    // trigger the attack immediately
    synth.triggerAttackRelease(noteName + (nextOctave ? "5" : "4"), "8n")
  }
}
