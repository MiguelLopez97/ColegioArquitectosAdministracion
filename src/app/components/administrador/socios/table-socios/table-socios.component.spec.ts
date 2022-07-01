import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSociosComponent } from './table-socios.component';

describe('TableSociosComponent', () => {
  let component: TableSociosComponent;
  let fixture: ComponentFixture<TableSociosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSociosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
