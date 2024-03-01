import { Injectable } from '@angular/core';
import { ScalesService } from './scales.service';
import { ChordsService } from './chords.service';
import { IScale, IScaleProgressionDefinition, ScaleType } from '../models/IScale';
import { Observable, map, of, switchMap, zip } from 'rxjs';
import { IScaleProgression } from '../models/IScaleProgression';

@Injectable({
  providedIn: 'root'
})
export class ScaleProgressionService {

  constructor(private scaleService: ScalesService, private chordService: ChordsService) 
  {

  }

  protected getProgression(scale: IScale, definition: IScaleProgressionDefinition) : Observable<IScaleProgression> {
    
    let chordObservables$$ = [];
    for(let i = 0 ; i < scale.noteIntervals.length && i < definition.chords.length; i++) {
      let scaleNote = scale.noteIntervals[i].note.name;
      let progressionChordType = definition.chords[i];
      if (progressionChordType) {
        chordObservables$$.push(this.chordService.chord(scaleNote, progressionChordType));
      } else {
        chordObservables$$.push(of(null));
      }
    }

    return zip(...chordObservables$$)
      .pipe(
        map(chords => {
          let result: IScaleProgression= {
            scale: scale,
            chords: chords,
            definition: definition
          };

          return result;
        })
      );
  }


  getProgressions(note: string, scaleType: ScaleType) : Observable<IScaleProgression[]> {
    return this.scaleService.scale(note, scaleType)
      .pipe(
        switchMap(scale => {

            let progressions$$ = scale.definition.progressions.map(progression => {
              return this.getProgression(scale, progression);
            });
            
           return zip(...progressions$$);
        })
      )
  } 
}
