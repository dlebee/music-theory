import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../../instruments/guitars/services/guitar.service';
import { ChordsService } from '../../core-theory/services/chords.service';
import { ChordTypes } from '../../core-theory/models/IChord';
import { firstValueFrom } from 'rxjs';
import { GuitarInstruments } from '../../instruments/guitars/models/IGuitar';


@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent implements OnInit {
  constructor(private guitar: GuitarService, private chordService: ChordsService) {
  }
  async ngOnInit() {
    const chord = await firstValueFrom(this.chordService.chord('G', ChordTypes.Major));
    const guitar = await firstValueFrom(this.guitar.createGuitar(GuitarInstruments.GUITAR_STANDARD));
    console.log(this.guitar.findChordPositions(guitar, chord));
  }
}
