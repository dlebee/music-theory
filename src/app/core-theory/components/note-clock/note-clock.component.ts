import { Component, Input } from '@angular/core';
import { INoteInterval } from '../../models/INoteInterval';
import { NgFor, NgIf } from '@angular/common';
import { ToneService } from '../../services/tone.service';
import { InlineNoteComponent } from '../inline-note/inline-note.component';
import { INote } from '../../models/INote';

@Component({
  selector: 'app-note-clock',
  standalone: true,
  imports: [NgFor, NgIf, InlineNoteComponent],
  templateUrl: './note-clock.component.html',
  styleUrl: './note-clock.component.scss'
})
export class NoteClockComponent {

  constructor(private tone: ToneService) {

  }

  @Input() intervals: INoteInterval[] = [];
  @Input() selectedIntervals: INoteInterval[] = [];

  get indexAfterB() {
    return this.intervals.findIndex(t => t.note.name.charAt(0) > 'B');
  }

  playNote(note: string, nextOctave: boolean = false) {
    this.tone.playNote(note, nextOctave ? "5" : "4", "8n");
  }

  findSelectedIntervalsWithNext()  {
    let result: { start: number, end: number }[] = [];

    for (let i = 0; i < this.intervals.length; i++) {
      if (this.isSelected(this.intervals[i])) {
        let j = i + 1;
        while (j < this.intervals.length && !this.isSelected(this.intervals[j])) {
          j++;
        }
        const end = j < this.intervals.length ? j : 0; // Wrap around to the beginning if no next interval is found
        result.push({ start: i, end: end });
      }
    }

    return result;
  }

  selectedNoteColor(note: INote) {
    return this.selectedIntervals.map(t => t.note.name).includes(note.name) ? 'blue' : 'black';
  }

  selectedIntervalColor(intervalName: string) {
    return this.selectedIntervals.map(t => t.name).includes(intervalName) ? 'blue' : 'black';
  }

  isSelected(noteInterval: INoteInterval) {
    return this.selectedIntervals.find(t => t.distanceInHalfTones == noteInterval.distanceInHalfTones) ? true : false;
  }

  calculateX(index: number): number {
    const radius = 120; // Radius of the circle
    const angle = (index * 30) * (Math.PI / 180); // Convert angle to radians
    return radius * Math.sin(angle); // Calculate X coordinate
  }
  
  calculateY(index: number): number {
    const radius = 120; // Radius of the circle
    const angle = (index * 30) * (Math.PI / 180); // Convert angle to radians
    return -radius * Math.cos(angle); // Calculate Y coordinate (negative to invert the circle)
  } 
}
