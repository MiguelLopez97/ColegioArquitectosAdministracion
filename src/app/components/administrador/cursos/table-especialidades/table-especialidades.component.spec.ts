import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEspecialidadesComponent } from './table-especialidades.component';

describe('TableEspecialidadesComponent', () => {
  let component: TableEspecialidadesComponent;
  let fixture: ComponentFixture<TableEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
