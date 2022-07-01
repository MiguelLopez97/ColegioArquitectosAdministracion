import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParticipantesComponent } from './table-participantes.component';

describe('TableParticipantesComponent', () => {
  let component: TableParticipantesComponent;
  let fixture: ComponentFixture<TableParticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableParticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
