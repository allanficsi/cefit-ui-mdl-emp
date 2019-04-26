import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoVisualizarComponent } from './espaco-visualizar.component';

describe('EspacoVisualizarComponent', () => {
  let component: EspacoVisualizarComponent;
  let fixture: ComponentFixture<EspacoVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacoVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacoVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
