import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBandejaCotizacionesComponent } from './table-bandeja-cotizaciones.component';

describe('TableBandejaCotizacionesComponent', () => {
  let component: TableBandejaCotizacionesComponent;
  let fixture: ComponentFixture<TableBandejaCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBandejaCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBandejaCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
