import { Component, Input } from '@angular/core';
import { INote } from '../../models/INote';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inline-note',
  standalone: true,
  imports: [NgIf],
  templateUrl: './inline-note.component.html',
  styleUrl: './inline-note.component.scss'
})
export class InlineNoteComponent {
  @Input() note: INote | undefined;
}
