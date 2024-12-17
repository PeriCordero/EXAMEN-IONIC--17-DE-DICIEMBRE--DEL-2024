import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasDocentePage } from './asistencias-docente.page';

describe('AsistenciasDocentePage', () => {
  let component: AsistenciasDocentePage;
  let fixture: ComponentFixture<AsistenciasDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
