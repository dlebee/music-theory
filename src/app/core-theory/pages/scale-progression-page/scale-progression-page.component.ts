import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ScaleType } from '../../models/IScale';
import { Observable, switchMap, zip } from 'rxjs';
import { ScaleProgressionService } from '../../services/scale-progression.service';
import { IScaleProgression } from '../../models/IScaleProgression';
import { AsyncPipe, JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { IChord } from '../../models/IChord';
import { ToneService } from '../../services/tone.service';

@Component({
  selector: 'app-scale-progression-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TitleCasePipe, RouterModule],
  templateUrl: './scale-progression-page.component.html',
  styleUrl: './scale-progression-page.component.scss'
})
export class ScaleProgressionPageComponent implements OnInit {


  progression$?: Observable<IScaleProgression>;

  constructor(private route: ActivatedRoute, private scaleProgressionService: ScaleProgressionService, private toneService: ToneService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteName = params["note"] as string;
      const scaleType = params["type"] as ScaleType;
      this.progression$ = this.scaleProgressionService.getProgression(noteName, scaleType);
    });
  }

  getRomanNumeral(num: number) {
    const romanNumeralMap = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ];

    let result = '';

    for (let i = 0; i < romanNumeralMap.length; i++) {
      while (num >= romanNumeralMap[i].value) {
        result += romanNumeralMap[i].numeral;
        num -= romanNumeralMap[i].value;
      }
    }

    return result;
  }

  playNote(note: string) {
    this.toneService.playNote(note, "4", "8n");
  }

  playChord(chord: IChord) {
    this.toneService.playChord(chord);
  }
}
