import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ScaleType } from '../../models/IScale';
import { Observable, switchMap, zip } from 'rxjs';
import { ScaleDegreeService } from '../../services/scale-degree.service';
import { IScaleDegrees } from '../../models/IScaleDegrees';
import { AsyncPipe, JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { IChord } from '../../models/IChord';
import { ToneService } from '../../services/tone.service';
import { getRomanNumeral } from '../../utils/number.util';

@Component({
  selector: 'app-scale-degrees-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TitleCasePipe, RouterModule, JsonPipe],
  templateUrl: './scale-degrees-page.component.html',
  styleUrl: './scale-degrees-page.component.scss'
})
export class ScaleDegreesPageComponent implements OnInit {


  degrees$?: Observable<IScaleDegrees>;

  constructor(private route: ActivatedRoute, private scaleProgressionService: ScaleDegreeService, private toneService: ToneService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteName = params["note"] as string;
      const scaleType = params["type"] as ScaleType;
      this.degrees$ = this.scaleProgressionService.getProgression(noteName, scaleType);
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
}
