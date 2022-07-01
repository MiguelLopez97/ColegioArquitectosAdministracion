import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiaComponent } from './form-dia.component';

describe('FormDiaComponent', () => {
  let component: FormDiaComponent;
  let fixture: ComponentFixture<FormDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
