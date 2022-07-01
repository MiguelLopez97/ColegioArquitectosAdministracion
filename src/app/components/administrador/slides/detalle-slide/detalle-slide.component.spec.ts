import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSlideComponent } from './detalle-slide.component';

describe('DetalleSlideComponent', () => {
  let component: DetalleSlideComponent;
  let fixture: ComponentFixture<DetalleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
