import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/Inscripcion';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/constantes';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  private http = inject(HttpClient);

  /** Todas las inscripciones (vista admin) */
  getTodas(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${API_URL}/inscripciones`);
  }

  /** Inscriptos de una clase (detalle del admin) */
  getPorClase(claseId: number | string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${API_URL}/inscripciones?claseId=${claseId}`);
  }

  getPorUsuario(usuarioId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${API_URL}/inscripciones?usuarioId=${usuarioId}`);
  }

  /** Devuelve [] si el usuario no está anotado en esa clase */
  getPorUsuarioYClase(usuarioId: number, claseId: number | string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${API_URL}/inscripciones?usuarioId=${usuarioId}&?claseId=${claseId}`,
    );
  }

  inscribir(datos: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${API_URL}/inscripciones`, datos);
  }

  /** Lo usa el user (cancelar su inscripción) y el admin (quitar a un usuario de una clase) */
  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/inscripciones/${id}`);
  }
}
