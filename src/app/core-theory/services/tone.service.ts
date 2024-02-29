import { Injectable } from '@angular/core';

import { Synth } from 'tone/build/esm/instrument/Synth';
const synth = new Synth().toDestination();

@Injectable({
  providedIn: 'root'
})
export class ToneService {

  constructor() { }

  playNote(noteName: string, position: string, length: string) {
    
    // trigger the attack immediately
    synth.triggerAttackRelease(noteName + position, length)
  }
}
