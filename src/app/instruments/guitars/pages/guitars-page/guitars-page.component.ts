import { AsyncPipe, JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { GuitarOptions, GuitarService } from '../../services/guitar.service';
import { Observable, map, of } from 'rxjs';
import { GuitarInstruments, IGuitar, IGuitarChord, IGuitarFret, IGuitarString } from '../../models/IGuitar';
import { FormsModule } from '@angular/forms';
import { GuitarComponent, IGuitarPositionsDisplay } from '../../components/guitar/guitar.component';
import { NoteService } from '../../../../core-theory/services/note.service';
import { INote } from '../../../../core-theory/models/INote';
import { InlineNoteComponent } from '../../../../core-theory/components/inline-note/inline-note.component';
import { ScaleType, scales } from '../../../../core-theory/models/IScale';
import { ScaleDegreeService } from '../../../../core-theory/services/scale-degree.service';
import { IScaleDegrees } from '../../../../core-theory/models/IScaleDegrees';
import { DegreesTableComponent } from '../../../../core-theory/components/degrees-table/degrees-table.component';
import { ScaleComponent } from '../../../../core-theory/components/scale/scale.component';
import { ChordComponent } from '../../../../core-theory/components/chord/chord.component';
import { IChord, MusicStyle } from '../../../../core-theory/models/IChord';
import randomColor from 'randomcolor';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ToneService } from '../../../../core-theory/services/tone.service';
import { GuitarChordComponent } from '../../components/guitar-chord/guitar-chord.component';

@Component({
  selector: 'app-guitars-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, JsonPipe,
    GuitarComponent, InlineNoteComponent, DegreesTableComponent,
    ScaleComponent, ChordComponent, TitleCasePipe,
    NgbAccordionModule, GuitarChordComponent
  ],
  templateUrl: './guitars-page.component.html',
  styleUrl: './guitars-page.component.scss'
})
export class GuitarsPageComponent {
  options$: Observable<GuitarOptions[]>;
  private _currentType: GuitarInstruments | null = null;
  guitar: IGuitar | null = null;
  guitar$: Observable<IGuitar | null> = of(null);
  reversed = false;
  notes$: Observable<INote[]>;
  selectedNote: INote | null = null;
  selectedScale: ScaleType | null = null;
  scaleTypes = scales.map(t => t.type);
  degrees$: Observable<IScaleDegrees | null> = of(null);
  scaleNotes: IGuitarPositionsDisplay[] = [];
  showClocks = false;
  showAllStyles = false;
  styles: { title: string; value: MusicStyle; }[];
  selectedStyle: MusicStyle | null = null;
  chordsCache: { [key: string] : {
    chord: IChord,
    variations: {
      guitarChord: IGuitarChord,
      chordDisplay: IGuitarPositionsDisplay
    }[]
  }} = {};

  constructor(private guitarService: GuitarService,
    private noteService: NoteService,
    private degreeService: ScaleDegreeService,
    private toneService: ToneService) {
    this.options$ = guitarService.options();
    this.currentType = GuitarInstruments.GUITAR_STANDARD;
    this.notes$ = this.noteService.getNotes();
    this.styles = Object.values(MusicStyle).map((value) => {
      return { title: value, value: value };
    })
  }

  playGuitarChord(guitarChord: IGuitarChord) {
    this.toneService.playNotesAsChord(guitarChord.positions.map(position => {
      if (position.isOpenString)
        return `${position.string.openString.name}${position.string.startOctave}`
      else
        return `${position.fret?.note.name}${position.fret?.octave}`
    }));
  }

  refreshDegrees() {
    if (this.selectedNote && this.selectedScale) {
      this.degrees$ = this.degreeService.getDegrees(this.selectedNote!.name, this.selectedScale)
        .pipe(
          map(d => {
            if (this.guitar)
              this.scaleNotes = [this.guitarService.findScalePositions(this.guitar!, d.scale)];
            else
              this.scaleNotes = [];
            return d;
          })
        )
    } else {
      this.degrees$ = of(null);
    }
  }

  get currentType() {
    return this._currentType;
  }

  getChordVariations(guitar: IGuitar, c: IChord) {

    let cacheKey = `${guitar.definition.type}:${c.key.name}:${c.type}`;
    if (this.chordsCache[cacheKey]) {
      console.log('using cache for cache key', cacheKey);
      return this.chordsCache[cacheKey].variations;
    }

    let chords = this.guitarService.findChordPositions(guitar, c);
    let randomColors = randomColor({ count: chords.length, luminosity: 'dark' })
    this.chordsCache[cacheKey] = {
      chord: c,
      variations: chords.map((gc, index) => {
        return {
          guitarChord: gc,
          chordDisplay: {
            name: `position ${index+1}`,
            color: randomColors[index],
            textColor: 'white',
            positions: gc.positions,
            key: c.key
          },
        }
      })
    };


    console.log('created cache for cache key', cacheKey);
    return this.chordsCache[cacheKey].variations;
  }

  set currentType(value: GuitarInstruments | null) {
    this._currentType = value;

    let newGuitar$ = this._currentType ? this.guitarService.createGuitar(this._currentType) : of<IGuitar | null>(null);
    this.guitar$ = newGuitar$.pipe(
      map(guitar => {
        this.guitar = guitar;
        this.refreshDegrees();
        return guitar;
      })
    );
  }
}
