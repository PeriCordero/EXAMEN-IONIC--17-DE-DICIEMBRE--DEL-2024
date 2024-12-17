import { CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auths/auth.service';

@Injectable({
  providedIn: 'root',
  })


  export class CanmatchGuard implements CanMatch {
    // Constructor que inyecta AuthService y Router
    constructor(private authService: AuthService, private router: Router) {}
    // Método canMatch que determina si se puede acceder a la ruta
    canMatch(route: Route, segments: UrlSegment[]): boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
    // Si está autenticado, permite el acceso a la ruta
    return true;
    } else {
    // Si no está autenticado, redirige a la página de inicio de sesión
    this.router.navigate(['/home']);
    // Bloquea el acceso a la ruta
    return false;
    }
    }
    }