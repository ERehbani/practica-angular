import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { API_URL } from '../shared/constantes';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private http = inject(HttpClient);

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/usuarios`);
  }
}
