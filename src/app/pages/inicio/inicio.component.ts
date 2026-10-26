import { Component, computed, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClasesService } from '../../services/clases.service';
import { DIAS, porDiaYHorario } from '../../shared/constantes';
import { Router } from '@angular/router';
import { ClaseCard } from '../../components/clase-card/clase-card.component';

@Component({
  imports: [ReactiveFormsModule, ClaseCard],
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class Inicio {
  private clasesSrv = inject(ClasesService);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  dias = DIAS;
  clases = toSignal(this.clasesSrv.getClases(), { initialValue: [] });


  busqueda = this.fb.control('');
  diaFiltro = this.fb.control(''); // '' = todos los días

  private texto = toSignal(this.busqueda.valueChanges, { initialValue: '' });
  private dia = toSignal(this.diaFiltro.valueChanges, { initialValue: '' });

  /** Clases filtradas por nombre y día, ordenadas por día y horario */
  filtradas = computed(() => {
    const t = this.texto().toLowerCase().trim();
    const d = this.dia();
    return this.clases()
      .filter((c) => c.nombre.toLowerCase().includes(t))
      .filter((c) => d === '' || c.dia === d)
      .sort(porDiaYHorario);
  });

  irADetalle(id: number) {
    this.router.navigate(['/class', id]);
  }
}
