import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFactoresComponent } from './catalogo-factores.component';

describe('CatalogoFactoresComponent', () => {
  let component: CatalogoFactoresComponent;
  let fixture: ComponentFixture<CatalogoFactoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoFactoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoFactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
