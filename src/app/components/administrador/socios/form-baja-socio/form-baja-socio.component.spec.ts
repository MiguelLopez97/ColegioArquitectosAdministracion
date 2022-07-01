import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBajaSocioComponent } from './form-baja-socio.component';

describe('FormBajaSocioComponent', () => {
  let component: FormBajaSocioComponent;
  let fixture: ComponentFixture<FormBajaSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBajaSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBajaSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
