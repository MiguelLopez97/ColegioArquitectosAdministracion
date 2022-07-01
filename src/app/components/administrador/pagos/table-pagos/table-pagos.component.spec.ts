import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePagosComponent } from './table-pagos.component';

describe('TablePagosComponent', () => {
  let component: TablePagosComponent;
  let fixture: ComponentFixture<TablePagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
