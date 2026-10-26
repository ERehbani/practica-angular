import { Component, input, output } from '@angular/core';
import { Clase } from '../../models/Clase';

@Component({
  imports: [],
  selector: 'app-clase-card',
  templateUrl: './clase-card.component.html',
})
export class ClaseCard {
  clase = input.required<Clase>();
  detalle = output<number>();
}
