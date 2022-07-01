import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoticiasComponent } from './form-noticias.component';

describe('FormNoticiasComponent', () => {
  let component: FormNoticiasComponent;
  let fixture: ComponentFixture<FormNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
