import { Injectable } from '@angular/core';
import { INote } from '../models/INote';
import { Observable, combineLatest, map, zip } from 'rxjs';
import { IScale, IScaleDefinition, ScaleType, categories, scales } from '../models/IScale';
import { NoteIntervalService } from './note-interval.service';
import { NoteService } from './note.service';
import { safeSemiTone } from '../utils/note.util';

@Injectable({
  providedIn: 'root'
})
export class ScalesService {

  constructor(private noteIntervalService: NoteIntervalService) { }

  allScales(note: INote | string): Observable<IScale[]> {
    let definitions = scales.map(scale => this.scale(note, scale.type));
    return zip(...definitions);
  }

  scale(note: INote | string, type: ScaleType): Observable<IScale> {
    let noteName: string = typeof note == "object" ? (note as INote).name : note as string;
    return this.noteIntervalService.getNoteIntervals(noteName).pipe(
      map(noteIntervals => {

        const scaleDefinition = scales.find(t => t.type == type);
        if (!scaleDefinition)
          throw Error(`scale definition could not be found for type ${type}`);

        let scaleNotes = scaleDefinition!.semitones.map(s => {
          let finalSemiTone = safeSemiTone(s);
          let noteInterval = noteIntervals.find(ni => ni.distanceInHalfTones == finalSemiTone);
          return noteInterval;
        });

        let scaleCategory = categories.find(t => t.type == scaleDefinition.category);

        return <IScale>{
          key: noteIntervals[0].note,
          category: scaleCategory,
          definition: scaleDefinition,
          steps: this.getSteps(scaleDefinition),
          noteIntervals: scaleNotes
        };
      })
    );
  }

  getSteps(definition: IScaleDefinition) : string[] {

    let steps = definition.semitones.reduce((prev, cur) => {
      let currentIndex = definition.semitones.indexOf(cur);
      if (currentIndex == 0)
        return [];


      let previousSemiTone = definition.semitones[currentIndex-1];
      let distance = cur - previousSemiTone;
      
      if (distance == 1)
        prev.push("H");
      else if (distance == 2)
        prev.push("W");
      else if (distance == 3)
        prev.push("W+H");
      else 
        prev.push(distance.toString())

      return prev.concat()
    }, [] as string[]);

    return steps;
  }
}
