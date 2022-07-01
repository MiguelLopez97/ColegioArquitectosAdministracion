import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNormatecaComponent } from './detalle-normateca.component';

describe('DetalleNormatecaComponent', () => {
  let component: DetalleNormatecaComponent;
  let fixture: ComponentFixture<DetalleNormatecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleNormatecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNormatecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
