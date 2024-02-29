import { INote } from "./INote";
import { INoteInterval } from "./INoteInterval";

export enum ChordTypes {
    Major = "major",
    Minor = "minor",
    Deminished = "Deminished",
    MajorSeventh = "MajorSeventh",
    MinorSeventh = "MinorSeventh",
    DominantSeventh = "DominantSeventh",
    Sus2 = "Sus2",
    Sus4 = "Sus4",
    Augmented = "Augmented",
    DominantNinth = "DominantNinth",
    MajorEleventh = "MajorEleventh",
    Fifth = "Fifth"
}

export interface IChordDefinition {
    type: ChordTypes;
    title: string;
    description: string;
    semitones: number[];
}

export interface IChord
{
    type: ChordTypes;
    title: string;
    key: INote;
    noteIntervals: INoteInterval[];
    chordDefinition: IChordDefinition;
}

export const chords: IChordDefinition[] = [
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