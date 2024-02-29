import { Component, NgModule } from '@angular/core';
import { ChordTypes, IChord, IChordDefinition, chords } from '../../models/IChord';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, of, switchMap, zip } from 'rxjs';
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

  _currentType: ChordTypes | null = null;
  chords$?: Observable<IChord[]>;

  constructor(private chordService: ChordsService, private noteService: NoteService,
    private tone: ToneService) {

  }

  get definitions() {
    return chords;
  }

  get currentType() {
    return this._currentType;
  }

  playNote(note: INote) {
    this.tone.playNote(note.name, "4", "8n");
  }

  playChord(chord: IChord) {
    this.tone.playChord(chord);
  }

  set currentType(newType: ChordTypes | null) {
    if (this._currentType != newType) {
      this._currentType = newType;
      if (newType == null) {
        this.chords$ = of([]);
      } else {
        this.chords$ = this.noteService.getNotes().pipe(
          switchMap(notes => {
            return zip(...notes.map(note => this.chordService.chord(note, newType)))
          })
        );
      }
    }
  }
}
