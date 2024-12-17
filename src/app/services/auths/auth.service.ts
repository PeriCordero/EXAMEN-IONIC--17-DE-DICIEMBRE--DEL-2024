import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false; // Estado de autenticación
  private localStorageKey = 'users'; // Clave para almacenar usuarios en localStorage

  constructor() {}

  // Registrar un nuevo usuario
  register(username: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    // Verificar si el usuario o correo ya existe
    const userExists = users.some(
      (user: any) => user.username === username || user.email === email
    );
    if (userExists) {
      return false; // Registro fallido
    }

    // Agregar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true; // Registro exitoso
  }

  // Iniciar sesión
  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    // Validar usuario y contraseña
    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (user) {
      this.isAuthenticated = true;
      return true; // Inicio de sesión exitoso
    }

    return false; // Usuario o contraseña incorrectos
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Cerrar sesión
  logout(): void {
    this.isAuthenticated = false;
    console.log('Sesión cerrada.');
  }
}
