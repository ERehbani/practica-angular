import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClasesService } from '../../services/clases.service';
import { Inscripcion } from '../../models/Inscripcion';
import { porDiaYHorario } from '../../shared/constantes';
import { AuthService } from '../../services/auth.service';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-mis-clases',
  imports: [RouterLink],
  templateUrl: 'mis-clases.component.html',
})
export class MisClases {
  private clasesSrv = inject(ClasesService);
  protected authSrv = inject(AuthService);
  private inscripcionesSrv = inject(InscripcionesService);

  inscripciones = signal<Inscripcion[]>([]);
  clases = toSignal(this.clasesSrv.getClases(), { initialValue: [] });

  /** Join inscripción → clase, ordenado por día y horario */
  lista = computed(() =>
    this.inscripciones()
      .flatMap((i) => {
        const clase = this.clases().find((c) => c.id === i.claseId);
        return clase ? [{ ...clase, inscripcionId: i.id }] : [];
      })
      .sort(porDiaYHorario),
  );

  //completar
  constructor() {
    // Se necesita el usuario logueado para saber de quién son las inscripciones.
    // Si no hay sesión, la lista queda vacía.
    const usuario = this.authSrv.usuario();
    if (!usuario) {
      this.inscripciones.set([]);
      return;
    }
    this.inscripcionesSrv.getPorUsuario(usuario.id).subscribe({
      next: (data) => this.inscripciones.set(data),
      error: (err) => {
        console.error('Error al consultar las inscripciones', err);
        this.inscripciones.set([]);
      },
    });
  }


  cancelar(inscripcionId: number) {
    if (!confirm('¿Seguro que querés cancelar tu inscripción a esta clase?')) return;
    this.inscripcionesSrv.cancelar(inscripcionId);
  }
}
