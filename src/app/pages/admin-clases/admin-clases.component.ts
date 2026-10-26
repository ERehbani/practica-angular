import { Component, computed, inject, signal } from '@angular/core';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { porDiaYHorario } from '../../shared/constantes';
import { ClasesService } from '../../services/clases.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-clases',
  imports: [RouterLink],
  templateUrl: 'admin-clases.component.html',
})
export class AdminClases {
  private claseSrv = inject(ClasesService);

  clases = signal<Clase[]>([]);
  inscripciones = signal<Inscripcion[]>([]);

  /** Por cada clase (ordenadas por día y horario): cantidad de inscriptos */
  resumen = computed(() =>
    [...this.clases()].sort(porDiaYHorario).map((clase) => ({
      clase,
      inscriptos: this.inscripciones().filter((i) => i.claseId === clase.id).length,
    })),
  );


  constructor() {
    this.claseSrv.getClases().subscribe((data) => this.clases.set(data));
  }
}
