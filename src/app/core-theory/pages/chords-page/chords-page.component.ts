import { Component, NgModule } from '@angular/core';
import { ChordTypes, IChord, IChordDefinition, chords } from '../../models/IChord';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, flatMap, forkJoin, map, of, switchMap, zip, zipAll } from 'rxjs';
import { ChordsService } from '../../services/chords.service';
import { NoteService } from '../../services/note.service';
import { ToneService } from '../../services/tone.service';
import { INote } from '../../models/INote';

@Component({
  selector: 'app-chords-page',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, JsonPipe, FormsModule],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.scss'
})
export class ChordsPageComponent {

  _currentTypes: ChordTypes[] = [];
  _currentNotes: string[] = [];
  chords$?: Observable<IChord[]> = of([]);
  notes$: Observable<INote[]>;

  constructor(private chordService: ChordsService, private noteService: NoteService,
    private tone: ToneService) {
      
    this.notes$ = noteService.getNotes();
  }

  get definitions() {
    return chords;
  }

  get currentTypes() {
    return this._currentTypes;
  }

  get currentNotes() {
    return this._currentNotes;
  }

  playNote(note: INote) {
    this.tone.playNote(note.name, "4", "8n");
  }

  playChord(chord: IChord) {
    this.tone.playChord(chord);
  }

  set currentNotes(values: string[]) {
    this._currentNotes = values;
    this.refreshChords();
  }

  set currentTypes(values: ChordTypes[]) {
    this._currentTypes = values;
    this.refreshChords();
  }

  refreshChords() {
    let temp = this.currentNotes.map(note => {
      return this.currentTypes.map(chordType => {
        return this.chordService.chord(note, chordType);
      });
    }).reduce((prev, cur) => prev.concat(cur));
    this.chords$ = zip(... temp);
  }
}
