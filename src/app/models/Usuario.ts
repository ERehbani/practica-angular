export type Rol = 'user' | 'admin';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

/** Lo que guardamos en sesión: el usuario sin la contraseña */
export type Sesion = Omit<Usuario, 'password'>;
