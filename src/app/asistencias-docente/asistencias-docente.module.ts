import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasDocentePageRoutingModule } from './asistencias-docente-routing.module';

import { AsistenciasDocentePage } from './asistencias-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasDocentePageRoutingModule
  ],
  declarations: [AsistenciasDocentePage]
})
export class AsistenciasDocentePageModule {}
