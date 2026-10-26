import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from '../models/Clase';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/constantes';

@Injectable({ providedIn: 'root' })
export class ClasesService {
  private http = inject(HttpClient)

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${API_URL}/clases`)
  }

  getClase(id: number | string): Observable<Clase> {
    return this.http.get<Clase>(`${API_URL}/clases/${id}`)
  }
}
