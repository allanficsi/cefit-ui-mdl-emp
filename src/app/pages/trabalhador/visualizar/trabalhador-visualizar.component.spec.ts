import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorVisualizarComponent } from './trabalhador-visualizar.component';

describe('TrabalhadorVisualizarComponent', () => {
  let component: TrabalhadorVisualizarComponent;
  let fixture: ComponentFixture<TrabalhadorVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabalhadorVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhadorVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
