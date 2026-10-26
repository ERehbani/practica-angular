import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClasesService } from '../../services/clases.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { AuthService } from '../../services/auth.service';
import { Clase } from '../../models/Clase';
import { Inscripcion } from '../../models/Inscripcion';

@Component({
  selector: 'app-clase-detalle',
  imports: [RouterLink],
  templateUrl: 'clase-detalle.component.html',
})
export class ClaseDetalle {
  private inscripcionesSrv = inject(InscripcionesService);
  private router = inject(Router);
  protected auth = inject(AuthService);
  private clasesSrv = inject(ClasesService);

  id = input.required<string>();

  clase = signal<Clase | null>(null);
  inscripcion = signal<Inscripcion | null>(null);
  yaInscripto = computed(() => this.inscripcion() !== null);

  enviando = signal(false); // funciona como un "loading..."
  error = signal('');

  constructor() {
    // Si cambia el :id, se carga la clase.
    effect(() => {
      this.enviando.set(true);
      const id = this.id();
      this.clasesSrv.getClase(id).subscribe({
        next: (data) => this.clase.set(data),
        error: (err) => {
          console.error(err);
          this.error.set(err);
        },
      });
      this.enviando.set(false);
    });

    // Si cambia el :id o el usuario logueado, se verifica si ya está anotado
    effect(() => {
      const id = this.id();
      const usuario = this.auth.usuario();
      if (!usuario) return;
      this.inscripcionesSrv
        .getPorUsuarioYClase(usuario.id, id)
        .subscribe((lista) => this.inscripcion.set(lista[0] ?? null));
    });
  }

  anotarme() {
    const usuarioId = this.auth.usuario()?.id;
    const claseId = this.clase()?.id;
    if (!usuarioId || !claseId || this.yaInscripto()) return;

    this.inscripcionesSrv.inscribir({ usuarioId, claseId }).subscribe((data) => {
      this.inscripcion.set(data);
      this.router.navigate(['/my-classes']);
    });
  }
}
