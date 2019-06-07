import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelVisualizarComponent } from './painel-visualizar.component';

describe('PainelVisualizarComponent', () => {
  let component: PainelVisualizarComponent;
  let fixture: ComponentFixture<PainelVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
