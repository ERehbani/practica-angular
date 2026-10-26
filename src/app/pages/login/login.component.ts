import { Component, inject, signal } from '@angular/core';
import { FormControlName, NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: 'login.component.html',
})
export class Login {
  protected fb = inject(NonNullableFormBuilder);
  private authSrv = inject(AuthService);
  protected error = signal<string | null>('');
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ingresar() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.authSrv.login(email, password).subscribe((ok) => {
      if (!ok) {
        this.error.set('Credenciales invalidas');
        return;
      }
      this.router.navigate([this.authSrv.esAdmin() ? 'admin/classes' : '/']);
    });
  }
}
