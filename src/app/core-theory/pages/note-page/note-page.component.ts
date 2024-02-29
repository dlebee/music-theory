import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../../models/INote';
import { NoteIntervalService } from '../../services/note-interval.service';
import { INoteInterval } from '../../models/INoteInterval';
import { ToneService } from '../../services/tone.service';
import { ChordsService } from '../../services/chords.service';
import { IChord } from '../../models/IChord';
import { IScale } from '../../models/IScale';
import { ScalesService } from '../../services/scales.service';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, TitleCasePipe],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.scss'
})
export class NotePageComponent implements OnInit{
  note$?: Observable<INote>;
  noteIntervals$?: Observable<INoteInterval[]>;
  chords$?: Observable<IChord[]>;
  scales$?: Observable<IScale[]>;

  constructor(private noteService: NoteService, 
    private noteIntervalService: NoteIntervalService,
    private route: ActivatedRoute,
    private tone: ToneService,
    private chordService: ChordsService,
    private scalesService: ScalesService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteName = params["note"];
      this.note$ = this.noteService.getNote(noteName);
      this.noteIntervals$ = this.noteIntervalService.getNoteIntervals(noteName);
      this.chords$ = this.chordService.allChords(noteName);
      this.scales$ = this.scalesService.allScales(noteName);
    });
  }

  playNote(noteName: string, nextOctave: boolean = false) {
    this.tone.playNote(noteName, nextOctave ? "5" : "4", "8n");
  }

  playChord(chord: IChord) {
    this.tone.playChord(chord);
  }

  playScale(scale: IScale) {
    let index = 0;
    let handler = setInterval(() => {
      
      if (index < scale.noteIntervals.length) {
        let note = scale.noteIntervals[index].note;
        this.playNote(note.name, false);
      } else {
        this.playNote(scale.key.name, true);
        clearInterval(handler);
      }

      index++;
    }, 500);
  }

  playReverseScale(scale: IScale) {
    let index = scale.noteIntervals.length;
    let handler = setInterval(() => {
      
      if (index < scale.noteIntervals.length) {
        let note = scale.noteIntervals[index];
        this.playNote(note.name, false);
        if (index == 0) {
          clearInterval(handler);
        }
      } else {
        this.playNote(scale.key.name, true);
      }

      index--;
    }, 750);
  }
}
