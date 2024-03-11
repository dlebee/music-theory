import { IChord } from "../../../core-theory/models/IChord";
import { INote } from "../../../core-theory/models/INote";

export interface IGuitarString
{
    startOctave: number;
    openString: INote;
    frets: IGuitarFret[];
}

export interface IGuitarFret {
    note: INote,
    octave: number
}

export interface IGuitar
{
    definition: IGuitarInstrumentDefinition
    fretCount: number;
    strings: IGuitarString[];
}

export interface IGuitarChord {
    chord: IChord;
    positions: Array<IGuitarChordPosition>
}

export interface IGuitarChordPosition {
    string: IGuitarString; // which string we are playing.
    isOpenString: boolean; // this tells us if its open string.
    fret: IGuitarFret | null; // if its not an open string its a fret.
}

export enum GuitarCategories {
    GUITAR = 'Guitar',
    UKULELE = 'Ukulele',
    BASS = 'Bass'
};

export enum GuitarInstruments {
    BASS_STANDARD_4_STRING = 'Standard 4-String',
    BASS_STANDARD_5_STRING = 'Standard 5-String',
    BASS_STANDARD_6_STRING = 'Standard 6-String',
    GUITAR_STANDARD = 'Standard',
    GUITAR_FLATENNED = 'Guitar Flatenned',
    GUITAR_DROP_D = 'Drop D',
    GUITAR_OPEN_G = 'Open G',
    GUITAR_OPEN_D = 'Open D',
    GUITAR_DROP_E = 'Drop E',
    UKULELE_STANDARD = 'Standard',
    UKULELE_BARITONE = 'Baritone'
};

export interface IGuitarInstrumentDefinition {
    category: GuitarCategories,
    frets: number, 
    type: GuitarInstruments,
    notes: {
        note: string,
        octave: number
    }[]
}

export const guitarInstruments: IGuitarInstrumentDefinition[] = [
    {
        category: GuitarCategories.BASS,
        type: GuitarInstruments.BASS_STANDARD_4_STRING,
        notes: [
            { note: 'E', octave: 1 },
            { note: 'A', octave: 1 },
            { note: 'D', octave: 2 },
            { note: 'G', octave: 2 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.BASS,
        type: GuitarInstruments.BASS_STANDARD_5_STRING,
        notes: [
            { note: 'B', octave: 0 },
            { note: 'E', octave: 1 },
            { note: 'A', octave: 1 },
            { note: 'D', octave: 2 },
            { note: 'G', octave: 2 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.BASS,
        type: GuitarInstruments.BASS_STANDARD_6_STRING,
        notes: [
            { note: 'B', octave: 0 },
            { note: 'E', octave: 1 },
            { note: 'A', octave: 1 },
            { note: 'D', octave: 2 },
            { note: 'G', octave: 2 },
            { note: 'C', octave: 3 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_STANDARD,
        notes: [
            { note: 'E', octave: 2 },
            { note: 'A', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'E', octave: 4 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_FLATENNED,
        notes: [
            { note: 'D#', octave: 2 },
            { note: 'G#', octave: 2 },
            { note: 'C#', octave: 3 },
            { note: 'A#', octave: 3 },
            { note: 'C#', octave: 3 },
            { note: 'D#', octave: 4 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_DROP_D,
        notes: [
            { note: 'D', octave: 2 },
            { note: 'A', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'E', octave: 4 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_OPEN_G,
        notes: [
            { note: 'D', octave: 2 },
            { note: 'G', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'D', octave: 4 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_DROP_D,
        notes: [
            { note: 'D', octave: 2 },
            { note: 'A', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'F#', octave: 3 },
            { note: 'A', octave: 3 },
            { note: 'D', octave: 4 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.GUITAR,
        type: GuitarInstruments.GUITAR_DROP_E,
        notes: [
            { note: 'E', octave: 1 },
            { note: 'A', octave: 1 },
            { note: 'D', octave: 2 },
            { note: 'G', octave: 2 },
            { note: 'B', octave: 2 },
            { note: 'E', octave: 3 }
        ],
        frets: 24
    },
    {
        category: GuitarCategories.UKULELE,
        type: GuitarInstruments.UKULELE_STANDARD,
        notes: [
            { note: 'G', octave: 3 },
            { note: 'C', octave: 3 },
            { note: 'E', octave: 4 },
            { note: 'A', octave: 4 }
        ],
        frets: 12
    },
    {
        category: GuitarCategories.UKULELE,
        type: GuitarInstruments.UKULELE_BARITONE,
        notes: [
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'E', octave: 4 }
        ],
        frets: 18
    }
];
