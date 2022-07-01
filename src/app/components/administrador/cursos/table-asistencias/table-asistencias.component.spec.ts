import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAsistenciasComponent } from './table-asistencias.component';

describe('TableAsistenciasComponent', () => {
  let component: TableAsistenciasComponent;
  let fixture: ComponentFixture<TableAsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
