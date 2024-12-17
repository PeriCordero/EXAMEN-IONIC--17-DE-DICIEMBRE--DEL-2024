import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasDocentePage } from './asistencias-docente.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasDocentePageRoutingModule {}
