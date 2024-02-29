import { Injectable } from '@angular/core';
import { ChordTypes, IChord, IChordDefinition } from '../models/IChord';
import { INote } from '../models/INote';
import { Observable, map, of, throwError, zip } from 'rxjs';
import { NoteIntervalService } from './note-interval.service';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {

  private definitions: IChordDefinition[] = [
    {
      type: ChordTypes.Major,
      title: 'Major',
      description: 'Major chords sound happy and simple.',
      semitones: [0, 4, 7]
    },
    {
      type: ChordTypes.Minor,
      title: 'Minor',
      description: 'Minor chords are considered to be sad, or ‘serious.’',
      semitones: [0, 3, 7],
    },
    {
      type: ChordTypes.Fifth,
      title: 'Power Chords (Fifth Chord)',
      description: 'Often played by amplified guitars',
      semitones: [0, 7]
    },
    {
      type: ChordTypes.Deminished,
      title: 'Diminished',
      description: 'Diminished Chords sound tense and unpleasant.',
      semitones: [0, 3, 6]
    },
    {
      type: ChordTypes.MajorSeventh,
      title: 'Major Seventh',
      description: 'Major seventh chords are considered to be thoughtful, soft (Jazzy)',
      semitones: [0, 4, 7, 11]
    },
    {
      type: ChordTypes.MinorSeventh,
      title: 'Minor Seventh',
      description: 'Minor seventh chords are considered to be moody, or contemplative',
      semitones: [0, 3, 7, 10]
    },
    {
      type: ChordTypes.DominantSeventh,
      title: 'Dominant Seventh',
      description: 'Dominant seventh chords are considered to be strong and restless (jazz and blues, as well as jazz inspired r&b, hip hop, & EDM.)',
      semitones: [0, 4, 7, 10]
    },
    {
      type: ChordTypes.Sus2,
      title: 'Sus2',
      description: 'Sus2 Chords sound bright and nervous.',
      semitones: [0, 2, 7]
    },
    {
      type: ChordTypes.Sus4,
      title: 'Sus4',
      description: 'Sus4 Chords, like Sus2 chords, sound bright and nervous.',
      semitones: [0, 5, 7]
    },
    {
      type: ChordTypes.Augmented,
      title: 'Augmented',
      description: 'Augmented chords sound anxious and suspenseful.',
      semitones: [0, 4, 8]
    },
    {
      type: ChordTypes.DominantNinth,
      title: 'Dominant Ninth',
      description: 'common in jazz, funk, and R&B',
      semitones: [0, 4, 7, 10, 14]
    },
    {
      type: ChordTypes.MajorEleventh,
      title: 'Major Eleventh',
      description: 'common in jazz, funk, and R&B',
      semitones: [0, 4, 7, 11, 14, 17]
    },
  ];

  constructor(private noteService: NoteService, private noteIntervalService: NoteIntervalService) {

  }

  getDefinitions(): Observable<IChordDefinition[]> {
    return of(this.definitions);
  }

  majorChord(note: INote | string): Observable<IChord> {
    return this.chord(note, ChordTypes.Major);
  }

  minorChord(note: INote | string): Observable<IChord> {
    return this.chord(note, ChordTypes.Minor);
  }

  allChords(note: INote | string): Observable<IChord[]> {
    let definitions = this.definitions.map(cd => this.chord(note, cd.type));
    return zip(...definitions);
  }

  chord(note: INote | string, type: ChordTypes): Observable<IChord> {

    let chordDefinition: IChordDefinition | undefined = this.definitions.find(t => t.type == type);
    if (!chordDefinition) {
      return throwError(() => `could not find chord definition for type ${type}`);
    }

    return this.noteIntervalService.getNoteIntervals(note).pipe(
      map(noteIntervals => {
        let notes = chordDefinition!.semitones.map(s => {
          let finalSemiTone = this.safeSemiTone(s);
          let noteInterval = noteIntervals.find(ni => ni.distanceInHalfTones == finalSemiTone);
          return noteInterval!.note;
        });

        let chord: IChord = {
          key: notes[0],
          type: type,
          title: chordDefinition!.title,
          chordDefinition: chordDefinition!,
          notes: notes
        };

        return chord;
      })
    )

  }

  protected safeSemiTone(semiTone: number): number {
    return semiTone <= 12 ? semiTone : semiTone - 12;
  }
}
