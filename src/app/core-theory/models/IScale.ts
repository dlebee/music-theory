import { ChordTypes } from "./IChord";
import { INote } from "./INote";
import { INoteInterval } from "./INoteInterval";

export enum ScaleCategoryTypes {
    MAJOR = "Major",
    NATURAL_MINOR = "Natural Minor",
    HARMONIC_MINOR = "Harmonic Minor",
    MELODIC_MINOR = "Melodic Minor",
    PENTATONIC = "Pentatonic",
    BLUES = "Blues",
    WHOLE_TONE = "Whole Tone",
    ARABIC = "Arabic",
    SPANISH = "Spanish"
}

export enum ScaleType {
    IONIAN = "IONIAN",
    AEOLIAN = "AEOLIAN",
    HARMONIC_MINOR = "HARMONIC_MINOR",
    MELODIC_MINOR_ASCENDING = "MELODIC_MINOR_ASCENDING",
    MELODIC_MINOR_DESCENDING = "MELODIC_MINOR_DESCENDING",
    MAJOR_PENTATONIC = "MAJOR_PENTATONIC",
    MINOR_PENTATONIC = "MINOR_PENTATONIC",
    BLUES = "BLUES",
    WHOLE_TONE = "WHOLE_TONE",
    HIJAZ = "HIJAZ",
    BAYATI = "BAYATI",
    RAST = "RAST",
    PHRYGIAN_MODE = "PHRYGIAN_MODE",
    SPANISH_GYPSY = "SPANISH_GYPSY",
    PHRYGIAN_DOMINANT = "PHRYGIAN_DOMINANT"
}

export interface IScaleProgressionDefinition {
    title: string,
    chords: Array<ChordTypes|null>
}

export interface IScaleDefinition {
    name: string;
    semitones: number[];
    category: ScaleCategoryTypes;
    type: ScaleType;
    progressions: IScaleProgressionDefinition[]
}

export interface IScaleCategory {
    name: string;
    type: ScaleCategoryTypes;
}
/*
export const scales: IScaleDefinition[] = [
    { 
        name: "Major Scale (Ionian)", 
        semitones: [0, 2, 4, 5, 7, 9, 11], 
        category: ScaleCategoryTypes.MAJOR, 
        type: ScaleType.IONIAN,
        progressions: [
            ChordTypes.Major, 
            ChordTypes.Minor, 
            ChordTypes.Minor, 
            ChordTypes.Major, 
            ChordTypes.Major, 
            ChordTypes.Minor, 
            ChordTypes.Deminished
        ]
    },
    { 
        name: "Natural Minor Scale (Aeolian)", 
        semitones: [0, 2, 3, 5, 7, 8, 10], 
        category: ScaleCategoryTypes.NATURAL_MINOR, 
        type: ScaleType.AEOLIAN,
        progressions: [
            ChordTypes.Minor,
            ChordTypes.Deminished,
            ChordTypes.Major,
            ChordTypes.Minor,
            ChordTypes.Minor,
            ChordTypes.Major,
            ChordTypes.Major
        ]
    },
    { name: "Harmonic Minor Scale", semitones: [0, 2, 3, 5, 7, 8, 11], category: ScaleCategoryTypes.HARMONIC_MINOR, type: ScaleType.HARMONIC_MINOR },
    { name: "Melodic Minor Scale (Ascending)", semitones: [0, 2, 3, 5, 7, 9, 11], category: ScaleCategoryTypes.MELODIC_MINOR, type: ScaleType.MELODIC_MINOR_ASCENDING },
    { name: "Melodic Minor Scale (Descending)", semitones: [0, 2, 3, 5, 7, 8, 10], category: ScaleCategoryTypes.MELODIC_MINOR, type: ScaleType.MELODIC_MINOR_DESCENDING },
    { name: "Major Pentatonic Scale", semitones: [0, 2, 4, 7, 9], category: ScaleCategoryTypes.PENTATONIC, type: ScaleType.MAJOR_PENTATONIC },
    { name: "Minor Pentatonic Scale", semitones: [0, 3, 5, 7, 10], category: ScaleCategoryTypes.PENTATONIC, type: ScaleType.MINOR_PENTATONIC },
    { name: "Blues Scale", semitones: [0, 3, 5, 6, 7, 10], category: ScaleCategoryTypes.BLUES, type: ScaleType.BLUES },
    { name: "Whole Tone Scale", semitones: [0, 2, 4, 6, 8, 10], category: ScaleCategoryTypes.WHOLE_TONE, type: ScaleType.WHOLE_TONE },
    { name: "Hijaz Scale", semitones: [0, 1, 5, 6, 10, 11], category: ScaleCategoryTypes.ARABIC, type: ScaleType.HIJAZ },
    { name: "Bayati Scale", semitones: [0, 1, 4, 5, 8, 9], category: ScaleCategoryTypes.ARABIC, type: ScaleType.BAYATI },
    { name: "Rast Scale", semitones: [0, 2, 5, 7, 10], category: ScaleCategoryTypes.ARABIC, type: ScaleType.RAST },
    { name: "Phrygian Mode", semitones: [0, 1, 3, 5, 7, 8, 10], category: ScaleCategoryTypes.SPANISH, type: ScaleType.PHRYGIAN_MODE },
    { name: "Spanish Gypsy Scale", semitones: [0, 1, 4, 5, 7, 8, 10], category: ScaleCategoryTypes.SPANISH, type: ScaleType.SPANISH_GYPSY },
    { name: "Phrygian Dominant Scale", semitones: [0, 1, 4, 5, 7, 8, 10], category: ScaleCategoryTypes.SPANISH, type: ScaleType.PHRYGIAN_DOMINANT }
];*/

export const scales: IScaleDefinition[] = [
    {
        name: "Major Scale (Ionian)",
        semitones: [0, 2, 4, 5, 7, 9, 11],
        category: ScaleCategoryTypes.MAJOR,
        type: ScaleType.IONIAN,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Major, ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Deminished] },
        ]
    },
    {
        name: "Natural Minor Scale (Aeolian)",
        semitones: [0, 2, 3, 5, 7, 8, 10],
        category: ScaleCategoryTypes.NATURAL_MINOR,
        type: ScaleType.AEOLIAN,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Minor, ChordTypes.Deminished, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major] },
        ]
    },
    {
        name: "Harmonic Minor Scale",
        semitones: [0, 2, 3, 5, 7, 8, 11],
        category: ScaleCategoryTypes.HARMONIC_MINOR,
        type: ScaleType.HARMONIC_MINOR,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Minor, ChordTypes.Deminished, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Deminished, ChordTypes.Major] },
        ]
    },
    {
        name: "Melodic Minor Scale (Ascending)",
        semitones: [0, 2, 3, 5, 7, 9, 11],
        category: ScaleCategoryTypes.MELODIC_MINOR,
        type: ScaleType.MELODIC_MINOR_ASCENDING,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major, ChordTypes.Major, ChordTypes.Deminished, ChordTypes.Deminished] },
        ]
    },
    {
        name: "Melodic Minor Scale (Descending)",
        semitones: [0, 2, 3, 5, 7, 8, 10],
        category: ScaleCategoryTypes.MELODIC_MINOR,
        type: ScaleType.MELODIC_MINOR_DESCENDING,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Minor, ChordTypes.Deminished, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major] },
        ]
    },
    {
        name: "Major Pentatonic Scale",
        semitones: [0, 2, 4, 7, 9],
        category: ScaleCategoryTypes.PENTATONIC,
        type: ScaleType.MAJOR_PENTATONIC,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Major, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Major, null, null, null] },
        ]
    },
    {
        name: "Minor Pentatonic Scale",
        semitones: [0, 3, 5, 7, 10],
        category: ScaleCategoryTypes.PENTATONIC,
        type: ScaleType.MINOR_PENTATONIC,
        progressions: [
            { title: "Standard", chords: [ChordTypes.Minor, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Minor, null, null, null] },
        ]
    },
    {
        name: "Blues Scale",
        semitones: [0, 3, 5, 6, 7, 10],
        category: ScaleCategoryTypes.BLUES,
        type: ScaleType.BLUES,
        progressions: [
            { title: "Classic Blues", chords: [ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, null, null, null] },
            { title: "Blues Rock", chords: [ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major, null, null, null] },
            { title: "Blues Funk", chords: [ChordTypes.Minor, ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, null, null, null] },
        ]
    },
    {
        name: "Whole Tone Scale",
        semitones: [0, 2, 4, 6, 8, 10],
        category: ScaleCategoryTypes.WHOLE_TONE,
        type: ScaleType.WHOLE_TONE,
        progressions: [
            { title: "Experimental", chords: [ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh] },
        ]
    },
    {
        name: "Hijaz Scale",
        semitones: [0, 1, 5, 6, 10, 11],
        category: ScaleCategoryTypes.ARABIC,
        type: ScaleType.HIJAZ,
        progressions: [
            { title: "Traditional", chords: [ChordTypes.Major, ChordTypes.Minor, ChordTypes.DominantSeventh, ChordTypes.Minor, null, null, null] },
            { title: "Modern", chords: [ChordTypes.Minor, ChordTypes.Minor, ChordTypes.DominantSeventh, ChordTypes.Minor, null, null, null] },
            { title: "Experimental", chords: [ChordTypes.MinorSeventh, ChordTypes.MinorSeventh, ChordTypes.DominantSeventh, ChordTypes.MinorSeventh, null, null, null] },
        ]
    },
    {
        name: "Bayati Scale",
        semitones: [0, 1, 4, 5, 8, 9],
        category: ScaleCategoryTypes.ARABIC,
        type: ScaleType.BAYATI,
        progressions: [
            { title: "Traditional", chords: [ChordTypes.Major, ChordTypes.Minor, ChordTypes.Minor, ChordTypes.Minor, null, null, null] },
            { title: "Modern", chords: [ChordTypes.MinorSeventh, ChordTypes.MinorSeventh, ChordTypes.MinorSeventh, ChordTypes.MinorSeventh, null, null, null] },
            { title: "Experimental", chords: [ChordTypes.Minor, ChordTypes.Minor, ChordTypes.DominantSeventh, ChordTypes.Minor, null, null, null] },
        ]
    },
    {
        name: "Rast Scale",
        semitones: [0, 2, 5, 7, 10],
        category: ScaleCategoryTypes.ARABIC,
        type: ScaleType.RAST,
        progressions: [
            { title: "Classic", chords: [ChordTypes.Major, ChordTypes.Minor, ChordTypes.Major, ChordTypes.Minor, null, null, null] },
            { title: "Traditional", chords: [ChordTypes.Major, ChordTypes.MinorSeventh, ChordTypes.Major, ChordTypes.MinorSeventh, null, null, null] },
            { title: "Modern", chords: [ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, null, null, null] },
        ]
    },
    {
        name: "Phrygian Mode",
        semitones: [0, 1, 3, 5, 7, 8, 10],
        category: ScaleCategoryTypes.SPANISH,
        type: ScaleType.PHRYGIAN_MODE,
        progressions: [
            { title: "Classic", chords: [ChordTypes.Minor, ChordTypes.Major, ChordTypes.Major, ChordTypes.Minor, null, null, null] },
            { title: "Flamenco", chords: [ChordTypes.Minor, ChordTypes.MajorSeventh, ChordTypes.MajorSeventh, ChordTypes.Minor, null, null, null] },
            { title: "Spanish", chords: [ChordTypes.Minor, ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, ChordTypes.Minor, null, null, null] },
        ]
    },
    {
        name: "Spanish Gypsy Scale",
        semitones: [0, 1, 4, 5, 7, 8, 10],
        category: ScaleCategoryTypes.SPANISH,
        type: ScaleType.SPANISH_GYPSY,
        progressions: [
            { title: "Folk", chords: [ChordTypes.Minor, ChordTypes.Major, ChordTypes.Minor, ChordTypes.Major, null, null, null] },
            { title: "Traditional", chords: [ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, null, null, null] },
            { title: "Modern", chords: [ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, ChordTypes.MinorSeventh, ChordTypes.MajorSeventh, null, null, null] },
        ]
    },
    {
        name: "Phrygian Dominant Scale",
        semitones: [0, 1, 4, 5, 7, 8, 10],
        category: ScaleCategoryTypes.SPANISH,
        type: ScaleType.PHRYGIAN_DOMINANT,
        progressions: [
            { title: "Metal", chords: [ChordTypes.Major, ChordTypes.Minor, ChordTypes.DominantSeventh, ChordTypes.Minor, null, null, null] },
            { title: "Rock", chords: [ChordTypes.Minor, ChordTypes.DominantSeventh, ChordTypes.Minor, ChordTypes.DominantSeventh, null, null, null] },
            { title: "Fusion", chords: [ChordTypes.MinorSeventh, ChordTypes.DominantSeventh, ChordTypes.MinorSeventh, ChordTypes.DominantSeventh, null, null, null] },
        ]
    },
];


export const categories: IScaleCategory[] = [
    { name: "Major", type: ScaleCategoryTypes.MAJOR },
    { name: "Natural Minor", type: ScaleCategoryTypes.NATURAL_MINOR },
    { name: "Harmonic Minor", type: ScaleCategoryTypes.HARMONIC_MINOR },
    { name: "Melodic Minor", type: ScaleCategoryTypes.MELODIC_MINOR },
    { name: "Pentatonic", type: ScaleCategoryTypes.PENTATONIC },
    { name: "Blues", type: ScaleCategoryTypes.BLUES },
    { name: "Whole Tone", type: ScaleCategoryTypes.WHOLE_TONE },
    { name: "Arabic", type: ScaleCategoryTypes.ARABIC },
    { name: "Spanish", type: ScaleCategoryTypes.SPANISH }
];

export interface IScale {
    key: INote,
    noteIntervals: INoteInterval[];
    definition: IScaleDefinition,
    category: IScaleCategory
}
