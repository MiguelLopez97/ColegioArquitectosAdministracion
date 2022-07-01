import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFactoresUsoComponent } from './table-factores-uso.component';

describe('TableFactoresUsoComponent', () => {
  let component: TableFactoresUsoComponent;
  let fixture: ComponentFixture<TableFactoresUsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFactoresUsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFactoresUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
