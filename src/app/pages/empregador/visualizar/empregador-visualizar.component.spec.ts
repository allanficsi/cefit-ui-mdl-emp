import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadorVisualizarComponent } from './empregador-visualizar.component';

describe('EmpregadorVisualizarComponent', () => {
  let component: EmpregadorVisualizarComponent;
  let fixture: ComponentFixture<EmpregadorVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadorVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadorVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
