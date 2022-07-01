import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDiasComponent } from './table-dias.component';

describe('TableDiasComponent', () => {
  let component: TableDiasComponent;
  let fixture: ComponentFixture<TableDiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
