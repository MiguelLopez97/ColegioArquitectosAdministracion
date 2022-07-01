import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSocioComponent } from './detalle-socio.component';

describe('DetalleSocioComponent', () => {
  let component: DetalleSocioComponent;
  let fixture: ComponentFixture<DetalleSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
