import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSlideComponent } from './form-slide.component';

describe('FormSlideComponent', () => {
  let component: FormSlideComponent;
  let fixture: ComponentFixture<FormSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
