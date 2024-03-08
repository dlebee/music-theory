import { Component, Input } from '@angular/core';
import { IScaleDegrees } from '../../models/IScaleDegrees';
import { NgFor, NgIf } from '@angular/common';
import { getRomanNumeral } from '../../utils/number.util';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-degrees-table',
  standalone: true,
  imports: [NgFor, NgIf, NoteComponent],
  templateUrl: './degrees-table.component.html',
  styleUrl: './degrees-table.component.scss'
})
export class DegreesTableComponent {
  @Input({
    required: true
  }) degrees!: IScaleDegrees;

  getRomanNumeral(num: number) {
    return getRomanNumeral(num);
  }
}
