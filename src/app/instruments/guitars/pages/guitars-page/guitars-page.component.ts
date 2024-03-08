import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GuitarOptions, GuitarService } from '../../services/guitar.service';
import { Observable, of } from 'rxjs';
import { GuitarInstruments, IGuitar } from '../../models/IGuitar';
import { FormsModule } from '@angular/forms';
import { GuitarComponent } from '../../components/guitar/guitar.component';

@Component({
  selector: 'app-guitars-page',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, JsonPipe, GuitarComponent],
  templateUrl: './guitars-page.component.html',
  styleUrl: './guitars-page.component.scss'
})
export class GuitarsPageComponent {
  options$: Observable<GuitarOptions[]>;
  private _currentType: GuitarInstruments | null = null;
  guitar$: Observable<IGuitar | null> = of(null);
  reversed = false;

  constructor(private guitar: GuitarService) {
    this.options$ = guitar.options();
    this.currentType = GuitarInstruments.GUITAR_STANDARD;
  }

  get currentType() {
    return this._currentType;
  }

  set currentType(value: GuitarInstruments | null){
    this._currentType = value;

    if (this._currentType)
      this.guitar$ = this.guitar.createGuitar(this._currentType);
    else
      this.guitar$ = of(null);
  }
}
