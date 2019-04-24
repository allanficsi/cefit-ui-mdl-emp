import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoVisualizarComponent } from './acao-visualizar.component';

describe('AcaoVisualizarComponent', () => {
  let component: AcaoVisualizarComponent;
  let fixture: ComponentFixture<AcaoVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaoVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
