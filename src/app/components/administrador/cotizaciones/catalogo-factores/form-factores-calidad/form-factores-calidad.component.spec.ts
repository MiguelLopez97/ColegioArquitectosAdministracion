import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFactoresCalidadComponent } from './form-factores-calidad.component';

describe('FormFactoresCalidadComponent', () => {
  let component: FormFactoresCalidadComponent;
  let fixture: ComponentFixture<FormFactoresCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFactoresCalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFactoresCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
