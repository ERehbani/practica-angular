import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sesion, Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/constantes';
import { Router } from '@angular/router';

const CLAVE_STORAGE = 'gym-sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Usuario logueado (null = guest) */
  readonly usuario = signal<Sesion | null>(this.leerStorage());
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly logueado = computed(() => this.usuario() !== null);
  readonly esAdmin = computed(() => this.usuario()?.rol === 'admin');
  readonly esUser = computed(() => this.usuario()?.rol === 'user');

  constructor() {
    // Cada vez que cambia la sesión, la persistimos
    effect(() => {
      const u = this.usuario();
      //completar
      if (u) localStorage.setItem(CLAVE_STORAGE, JSON.stringify(u));
      else localStorage.removeItem(CLAVE_STORAGE);
    });
  }

  /** Devuelve true si las credenciales son correctas */
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<Usuario[] | []>(`${API_URL}/usuarios?email=${email}&password=${password}`)
      .pipe(
        map((usuarios) => {
          if (usuarios.length === 0) return false;
          const { password: _, ...sesion } = usuarios[0];
          this.usuario.set(sesion);
          return true;
        }),
      );
  }

  logout() {
    this.usuario.set(null);
    this.router.navigate(['/login']);
  }

  private leerStorage(): Sesion | null {
    const user = localStorage.getItem(CLAVE_STORAGE);
    return user ? JSON.parse(user) : null;
  }
}
