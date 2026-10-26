import { ClasesService } from './../../services/clases.service';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';
import { Usuario } from '../../models/Usuario';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-admin-clase-detalle',
  imports: [RouterLink],
  templateUrl: 'admin-clases-detalle.component.html',
})
export class AdminClaseDetalle {
  id = input.required<string>();
  clase = signal<Clase | null>(null);
  inscripciones = signal<Inscripcion[]>([]);
  usuarios = signal<Usuario[]>([]);
  claseSrv = inject(ClasesService);
  inscripcionSrv = inject(InscripcionesService);

  cargando = signal<boolean>(false);

  /** Join inscripción → usuario (sin la contraseña) */
  inscriptos = computed(() =>
    this.inscripciones().map((i) => {
      const u = this.usuarios().find((u) => u.id === i.usuarioId);
      return {
        inscripcionId: i.id,
        nombre: u?.nombre ?? '(usuario desconocido)',
        email: u?.email ?? '-',
      };
    }),
  );

  constructor() {
    // Si cambia el :id, se recargan la clase y sus inscriptos
    effect(() => {
      const id = this.id();
      this.cargando.set(true);
      this.claseSrv.getClase(id).subscribe((data) => this.clase.set(data));
      this.inscripcionSrv.getPorClase(id).subscribe((data) => this.inscripciones.set(data));
      this.cargando.set(false);
    });
  }


  quitar(inscripcionId: number, nombre: string) {
    if (!confirm(`¿Quitar a ${nombre} de esta clase?`)) return;
    this.inscripcionSrv
      .cancelar(inscripcionId)
      .subscribe(() => this.inscripciones().filter((i) => i.id !== inscripcionId));
  }
}
