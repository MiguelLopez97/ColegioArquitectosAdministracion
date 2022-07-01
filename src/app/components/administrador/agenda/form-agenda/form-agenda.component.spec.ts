import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendaComponent } from './form-agenda.component';

describe('FormAgendaComponent', () => {
  let component: FormAgendaComponent;
  let fixture: ComponentFixture<FormAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
