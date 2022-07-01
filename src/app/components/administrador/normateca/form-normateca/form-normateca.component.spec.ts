import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNormatecaComponent } from './form-normateca.component';

describe('FormNormatecaComponent', () => {
  let component: FormNormatecaComponent;
  let fixture: ComponentFixture<FormNormatecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNormatecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNormatecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
