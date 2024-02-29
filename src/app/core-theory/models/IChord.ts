import { INote } from "./INote";

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
    notes: INote[];
    chordDefinition: IChordDefinition;
}