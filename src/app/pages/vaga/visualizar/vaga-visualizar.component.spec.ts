import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaVisualizarComponent } from './vaga-visualizar.component';

describe('VagaVisualizarComponent', () => {
  let component: VagaVisualizarComponent;
  let fixture: ComponentFixture<VagaVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
