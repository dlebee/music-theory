import { Injectable } from '@angular/core';
import { ScalesService } from './scales.service';
import { ChordsService } from './chords.service';
import { ScaleType } from '../models/IScale';
import { map, switchMap, zip } from 'rxjs';
import { IScaleProgression } from '../models/IScaleProgression';

@Injectable({
  providedIn: 'root'
})
export class ScaleProgressionService {

  constructor(private scaleService: ScalesService, private chordService: ChordsService) 
  {

  }

  getProgression(note: string, scaleType: ScaleType) {
    return this.scaleService.scale(note, scaleType)
      .pipe(
        switchMap(scale => {
          if (scale.definition.progressions) {

            let chordObservables$$ = [];
            for(let i = 0 ; i < scale.noteIntervals.length && i < scale.definition.progressions.length; i++) {
              let scaleNote = scale.noteIntervals[i].note.name;
              let progressionChordType = scale.definition.progressions[i];
              chordObservables$$.push(this.chordService.chord(scaleNote, progressionChordType));
            }

            return zip(...chordObservables$$).pipe(
              map(chords => {
                return <IScaleProgression>{
                  scale: scale,
                  chords: chords
                }
              })
            );
            
          } else {
            throw new Error(`this scale does not have a progression`);
          }
        })
      )
  } 
}
