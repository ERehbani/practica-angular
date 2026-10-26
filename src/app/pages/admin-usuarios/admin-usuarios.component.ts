import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: 'admin-usuarios.component.html',
})
export class AdminUsuarios {

  usuarioSrv = inject(UsuariosService)
  usuarios = signal<Usuario[] | []>([])

  constructor(){
    this.usuarioSrv.getUsers().subscribe(data => this.usuarios.set(data))
  }
}
