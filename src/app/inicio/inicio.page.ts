import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { Platform } from '@ionic/angular';
import { CanDeactivate } from '@angular/router';
import { CanDeactivateGuard } from '../guards/candeactivate.guard';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy, CanDeactivate<InicioPage> {
  username: string = '';
  avatar: string = 'https://pbs.twimg.com/profile_images/1273019238282866689/yEn2L7ny_400x400.jpg';
  qrCodeImage: string = ''; // Almacena la imagen QR generada
  qrLink: string = 'asistencia-docente.html'; // Enlace interno para el QR

  constructor(private router: Router, private platform: Platform) {}

  ngOnInit(): void {
    this.blockBackNavigation();

    // Obtener el nombre de usuario desde el almacenamiento local
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.username = storedUser;
    }
  }

  ngOnDestroy(): void {
    if (this.platform.backButton) {
      this.platform.backButton.unsubscribe();
    }
  }

  blockBackNavigation() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('Retroceso bloqueado');
    });

    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.avatar = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  generateQRCode(): void {
    QRCode.toDataURL(this.qrLink)
      .then((urlImage: string) => {
        this.qrCodeImage = urlImage;
      })
      .catch((error: any) => {
        console.error('Error al generar el código QR:', error);
      });
  }

  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  canDeactivate(): boolean {
    return confirm('¿Estás seguro de que deseas salir de esta página? Los cambios no guardados se perderán.');
  }
}
