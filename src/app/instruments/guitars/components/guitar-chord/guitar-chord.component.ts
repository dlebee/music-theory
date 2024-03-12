import { Component, Input } from '@angular/core';
import { IGuitar, IGuitarChord, IGuitarChordPosition, IGuitarString } from '../../models/IGuitar';
import randomColor from 'randomcolor';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-guitar-chord',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './guitar-chord.component.html',
  styleUrl: './guitar-chord.component.scss'
})
export class GuitarChordComponent {
  @Input() guitar!: IGuitar;
  @Input() reversed: boolean = false;
  @Input() chord!: IGuitarChord
  randomColor: string;

  constructor() {
    let randomColors = randomColor({ count: 1, luminosity: 'dark' })
    this.randomColor = randomColors[0];
  }

  get stringSpacing(): number {
    return 40;
  }

  get fretSpacing(): number {
    return 20;
  }

  get xOffset(): number {
    return 20;
  }

  get yOffset(): number {
    return 20;
  }

  get strings(): IGuitarString[] {
    return this.guitar.strings;
  }

  get frets(): number[] {
    let maxFret = 0;
    for (const position of this.chord.positions) {
      const fretIndex = position.string.frets.indexOf(position.fret!);
      if (fretIndex >= 0) {
        maxFret = Math.max(maxFret, fretIndex);
      }
    }
    return Array.from({ length: maxFret + 1 }, (_, i) => i);
  }

  get svgWidth(): number {
    return this.stringSpacing * (this.strings.length - 1) + 2 * this.xOffset;
  }

  get svgHeight(): number {
    return this.fretSpacing * (this.frets.length) + 2 * this.yOffset;
  }

  get chordPositions(): IGuitarChordPosition[] {
    return this.chord.positions;
  }

  getFretIndex(position: IGuitarChordPosition) {
    let result = position.string.frets.indexOf(position.fret!);
    return result == -1 ? 0 : result;
  }

  getStringIndex(position: IGuitarChordPosition) {
    return this.guitar.strings.indexOf(position.string);
  }
}