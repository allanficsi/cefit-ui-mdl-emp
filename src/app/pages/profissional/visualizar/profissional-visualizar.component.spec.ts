import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalVisualizarComponent } from './profissional-visualizar.component';

describe('ProfissionalVisualizarComponent', () => {
  let component: ProfissionalVisualizarComponent;
  let fixture: ComponentFixture<ProfissionalVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
