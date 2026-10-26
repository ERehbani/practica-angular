import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class Navbar {
  protected auth = inject(AuthService);
  private router = inject(Router);

  salir() {
    //log out
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
