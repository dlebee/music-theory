import { Injectable } from '@angular/core';
import { ScalesService } from './scales.service';
import { ChordsService } from './chords.service';
import { ScaleType } from '../models/IScale';
import { first, map, switchMap, zip } from 'rxjs';
import { IScaleDegrees } from '../models/IScaleDegrees';
import { chords } from '../models/IChord';
import { nextIndexWithRollOver } from '../utils/note.util';

@Injectable({
  providedIn: 'root'
})
export class ScaleDegreeService {

  constructor(private scaleService: ScalesService, private chordService: ChordsService) 
  {

  }

  getProgression(note: string, scaleType: ScaleType) {
    return this.scaleService.scale(note, scaleType)
      .pipe(
        switchMap(scale => {

          const DEGREE_PATTERN = 2;
          let triads = [];
          for(let i = 0 ; i < scale.definition.semitones.length; i++) {
            let firstIndex = i;
            let secondIndex = nextIndexWithRollOver(i, 2, scale.definition.semitones.length);
            let thirdIndex = nextIndexWithRollOver(secondIndex, 2, scale.definition.semitones.length);
            let triad = [
              scale.noteIntervals[firstIndex].note,
              scale.noteIntervals[secondIndex].note,
              scale.noteIntervals[thirdIndex].note     
            ];

            triads.push(triad);
          }

          console.log(triads);

          return this.chordService.findChords(triads)
            .pipe(
              map(chords => {
                return <IScaleDegrees> {
                  scale: scale,
                  chords: chords
                }
              })
            );
        })
      )
  } 
}



