import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSolicitudesComponent } from './table-solicitudes.component';

describe('TableSolicitudesComponent', () => {
  let component: TableSolicitudesComponent;
  let fixture: ComponentFixture<TableSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
