import { Injectable } from '@angular/core';
import { INote } from '../models/INote';
import { Observable, combineLatest, map, zip } from 'rxjs';
import { IScale, ScaleType, categories, scales } from '../models/IScale';
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

    return this.noteIntervalService.getNoteIntervals(note).pipe(
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
          noteIntervals: scaleNotes
        };
      })
    );
  }
}
