import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencias-docente',
  templateUrl: './asistencias-docente.page.html',
  styleUrls: ['./asistencias-docente.page.scss'],
})
export class AsistenciasDocentePage implements OnInit {
  docenteID: string = ''; // ID del docente obtenido de los parámetros
  claseID: string = ''; // ID de la clase obtenido de los parámetros
  aula: string = ''; // Aula obtenido de los parámetros
  asistencia: {
    docenteID: string;
    claseID: string;
    aula: string;
    fecha: string;
    hora: string;
  } | null = null; // Objeto para almacenar los datos de asistencia

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Capturar parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.docenteID = params['docenteID'] || '';
      this.claseID = params['claseID'] || '';
      this.aula = params['aula'] || '';

      // Registrar asistencia si hay parámetros
      if (this.docenteID && this.claseID && this.aula) {
        this.registrarAsistencia();
      }
    });
  }

  // Generar valores aleatorios para docenteID, claseID y aula
  generarDatosAleatorios() {
    this.docenteID = this.generarNumeroAleatorio(1000, 9999).toString();
    this.claseID = this.generarNumeroAleatorio(100, 999).toString();
    this.aula = this.generarNumeroAleatorio(1, 50).toString();

    // Registrar la asistencia con los datos generados
    this.registrarAsistencia();
  }

  // Método para registrar la asistencia
  registrarAsistencia() {
    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString(); // Fecha en formato local
    const hora = fechaActual.toLocaleTimeString(); // Hora en formato local

    this.asistencia = {
      docenteID: this.docenteID,
      claseID: this.claseID,
      aula: this.aula,
      fecha,
      hora,
    };

    console.log('Asistencia registrada:', this.asistencia);
  }

  // Método auxiliar para generar un número aleatorio en un rango
  private generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
