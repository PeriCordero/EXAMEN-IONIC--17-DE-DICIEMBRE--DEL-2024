import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auths/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Estado de las validaciones
  isUsernameValid: boolean = true;
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;

  // Mensajes de error
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  // Estado de los campos tocados
  usernameTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Validación de nombre de usuario
  onUsernameBlur() {
    this.usernameTouched = true;
    this.isUsernameValid = this.username.length >= 3;
  }

  // Validación de correo electrónico
  onEmailBlur() {
    this.emailTouched = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.email) {
      this.isEmailValid = false;
      this.emailErrorMessage = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(this.email)) {
      this.isEmailValid = false;
      this.emailErrorMessage = 'Formato de correo inválido.';
    } else {
      this.isEmailValid = true;
      this.emailErrorMessage = '';
    }
  }

  // Validación de contraseña
  onPasswordBlur() {
    this.passwordTouched = true;

    if (!this.password) {
      this.isPasswordValid = false;
      this.passwordErrorMessage = 'La contraseña es obligatoria.';
    } else if (this.password.length < 6) {
      this.isPasswordValid = false;
      this.passwordErrorMessage = 'La contraseña debe tener al menos 6 caracteres.';
    } else if (!/[A-Z]/.test(this.password)) {
      this.isPasswordValid = false;
      this.passwordErrorMessage = 'La contraseña debe contener al menos una letra mayúscula.';
    } else if (!/\d/.test(this.password)) {
      this.isPasswordValid = false;
      this.passwordErrorMessage = 'La contraseña debe contener al menos un número.';
    } else {
      this.isPasswordValid = true;
      this.passwordErrorMessage = '';
    }
  }

  // Validación de confirmación de contraseña
  onConfirmPasswordBlur() {
    this.confirmPasswordTouched = true;
    this.isConfirmPasswordValid = this.password === this.confirmPassword;
  }

  // Método para verificar si el formulario es válido
  isFormInvalid() {
    return !(
      this.username &&
      this.email &&
      this.password &&
      this.confirmPassword &&
      this.isUsernameValid &&
      this.isEmailValid &&
      this.isPasswordValid &&
      this.isConfirmPasswordValid
    );
  }

  // Método de registro
  register() {
    this.onUsernameBlur();
    this.onEmailBlur();
    this.onPasswordBlur();
    this.onConfirmPasswordBlur();

    if (!this.isUsernameValid || !this.isEmailValid || !this.isPasswordValid || !this.isConfirmPasswordValid) {
      alert('Por favor, corrige los errores antes de continuar.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const success = this.authService.register(this.username, this.email, this.password);
    if (success) {
      alert('Registro exitoso');
      this.router.navigate(['/home']); // Redirigir al inicio de sesión
    } else {
      alert('El usuario o correo ya existe');
    }
  }
}
