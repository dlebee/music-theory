import { Injectable } from '@angular/core';

import { Synth } from 'tone/build/esm/instrument/Synth';
import { PolySynth } from 'tone/build/esm/instrument/PolySynth';
import { IChord } from '../models/IChord';

const synth = new Synth().toDestination();
const polySynth = new PolySynth().toDestination();

@Injectable({
  providedIn: 'root'
})
export class ToneService {

  constructor() { }

  playNote(noteName: string, position: string, length: string) {
    
    // trigger the attack immediately
    synth.triggerAttackRelease(noteName + position, length)
  }
  

  playChord(chord: IChord) {
    const parts = chord.notes.map(t => t.name + "4");
    polySynth.triggerAttackRelease(parts, "4n");
  }
}
