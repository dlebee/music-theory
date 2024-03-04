import { Component, HostListener, NgModule } from '@angular/core';
import { ChordTypes, IChord, IChordDefinition, chords } from '../../models/IChord';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, flatMap, forkJoin, map, of, switchMap, zip, zipAll } from 'rxjs';
import { ChordsService } from '../../services/chords.service';
import { NoteService } from '../../services/note.service';
import { ToneService } from '../../services/tone.service';
import { INote } from '../../models/INote';
import { InlineNoteComponent } from '../../components/inline-note/inline-note.component';
import { ChordComponent } from '../../components/chord/chord.component';

@Component({
  selector: 'app-chords-page',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, JsonPipe, FormsModule, InlineNoteComponent, ChordComponent],
  templateUrl: './chords-page.component.html',
  styleUrl: './chords-page.component.scss'
})
export class ChordsPageComponent {


  selectedChords: IChord[] = [];
  chords$?: Observable<IChord[]>;

  constructor(chordService: ChordsService,
    private tone: ToneService) {

    this.chords$ = chordService.everyChords();
  }

  get definitions() {
    return chords;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let number = Number.parseInt(event.key);
    if (Number.isNaN(number)) {
      return;
    }

    let index = number-1;
    if (index < this.selectedChords.length) {
      this.tone.playChord(this.selectedChords[index]);
    }
  }

  playChords() {
    for (const cord of this.selectedChords) {
      this.tone.playChord(cord);
    }
  }
}
