import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaCotizacionesComponent } from './bandeja-cotizaciones.component';

describe('BandejaCotizacionesComponent', () => {
  let component: BandejaCotizacionesComponent;
  let fixture: ComponentFixture<BandejaCotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandejaCotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
