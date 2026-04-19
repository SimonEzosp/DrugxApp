import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/data/service/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolesPermitidos = route.data['roles'] as string[];

    // Si la ruta no tiene roles definidos, permitir acceso
    if (!rolesPermitidos) return true;

    const rolUsuario = this.auth.getRol();

    // Si no hay rol (no logueado), ir al home
    if (!rolUsuario) {
      this.router.navigate(['/home']);
      return false;
    }

    if (rolesPermitidos.includes(rolUsuario)) {
      return true;
    }

    this.router.navigate(['/no-autorizado']);
    return false;
  }
}