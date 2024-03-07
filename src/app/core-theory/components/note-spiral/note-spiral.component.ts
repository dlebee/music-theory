import { Component, Input } from '@angular/core';
import { INoteInterval } from '../../models/INoteInterval';
import { ToneService } from '../../services/tone.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';

interface OctaveWithIntervals {
  octave: number,
  intervals: INoteInterval[]
}

const MIN_OCTAVE = 0;
const MAX_OCTAVE = 10;

@Component({
  selector: 'app-note-spiral',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe, NgStyle],
  templateUrl: './note-spiral.component.html',
  styleUrl: './note-spiral.component.scss'
})
export class NoteSpiralComponent {

  private _intervals: INoteInterval[] = [];
  private _octaveIntervals: OctaveWithIntervals[] = [];

  center: number = 250;
  centerRadius: number = 50;

  constructor(private tone: ToneService) {

  }

  @Input() set intervals(value: INoteInterval[]) {
    this._intervals = value;
    this.refreshOctaves();
  }

  get intervals() {
    return this._intervals;
  }

  get octaves() {
    return this._octaveIntervals;
  }

  cos(x: number) {
    return Math.cos(x)
  }

  sin(x: number) {
    return Math.sin(x)
  }

  get pi() {
    return Math.PI;
  }

  playNote(note: string, octave: number) {
    this.tone.playNote(note, `${octave}`, '8n');
  }

  reverse<T>(arr: T[]) {
    return arr.slice().reverse();
  }

  private refreshOctaves() {

    let newOctaves: OctaveWithIntervals[] = [];
    for (let i = MAX_OCTAVE; i >= MIN_OCTAVE; i--) {
      newOctaves.push({
        octave: i,
        intervals: this._intervals
      })
    }

    this._octaveIntervals = newOctaves;
  }
}
