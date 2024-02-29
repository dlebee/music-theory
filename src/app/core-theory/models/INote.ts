export interface INote
{
    name: string;
    alternativeName?: string;
    isNatural: boolean;
}

export const notes: Array<INote> =
[
  {
    name: 'A',
    isNatural: true,
  },
  {
    name: 'A#',
    alternativeName: 'Bb',
    isNatural: false,
  },
  {
    name: 'B',
    isNatural: true,
  },
  {
    name: 'C',
    isNatural: true,
  },
  {
    name: 'C#',
    alternativeName: 'Db',
    isNatural: false,
  },
  {
    name: 'D',
    isNatural: true,
  },
  {
    name: 'D#',
    alternativeName: 'Eb',
    isNatural: false,
  },
  {
    name: 'E',
    isNatural: true,
  },
  {
    name: 'F',
    isNatural: true,
  },
  {
    name: 'F#',
    alternativeName: 'Gb',
    isNatural: false,
  },
  {
    name: 'G',
    isNatural: true,
  },
  {
    name: 'G#',
    alternativeName: 'Ab',
    isNatural: false
  }
];