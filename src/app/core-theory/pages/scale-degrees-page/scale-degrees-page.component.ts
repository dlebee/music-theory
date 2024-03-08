import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ScaleType } from '../../models/IScale';
import { Observable, map, switchMap, zip } from 'rxjs';
import { ScaleDegreeService } from '../../services/scale-degree.service';
import { IScaleDegrees } from '../../models/IScaleDegrees';
import { AsyncPipe, JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { IChord } from '../../models/IChord';
import { ToneService } from '../../services/tone.service';
import { getRomanNumeral } from '../../utils/number.util';
import { InlineNoteComponent } from '../../components/inline-note/inline-note.component';
import { ChordComponent } from '../../components/chord/chord.component';
import { ScaleComponent } from '../../components/scale/scale.component';
import { DegreesTableComponent } from '../../components/degrees-table/degrees-table.component';

@Component({
  selector: 'app-scale-degrees-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TitleCasePipe, RouterModule, JsonPipe, 
    InlineNoteComponent, ChordComponent, ScaleComponent, DegreesTableComponent],
  templateUrl: './scale-degrees-page.component.html',
  styleUrl: './scale-degrees-page.component.scss'
})
export class ScaleDegreesPageComponent implements OnInit {


  degrees$?: Observable<IScaleDegrees>;
  private degree: IScaleDegrees | null = null;

  constructor(private route: ActivatedRoute, private scaleProgressionService: ScaleDegreeService, private toneService: ToneService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteName = params["note"] as string;
      const scaleType = params["type"] as ScaleType;
      this.degrees$ = this.scaleProgressionService.getDegrees(noteName, scaleType).pipe(
        map(degree => {
          this.degree = degree;
          return degree;
        })
      )
    });
  }

  getRomanNumeral(num: number) {
    return getRomanNumeral(num);
  }

  playNote(note: string) {
    this.toneService.playNote(note, "4", "8n");
  }

  playChord(chord: IChord) {
    this.toneService.playChord(chord);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.degree) {
      let numberOfSemiTones = this.degree.scale.noteIntervals.length;
      let number = Number.parseInt(event.key);
      if (Number.isNaN(number)) {
        return;
      } 

      let index = number-1;
      if (index < numberOfSemiTones) {
        this.playChord(this.degree.chords[index]);
      }
    }
  }
}
