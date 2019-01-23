import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadorAtualizarComponent } from './empregador-atualizar.component';

describe('EmpregadorAtualizarComponent', () => {
  let component: EmpregadorAtualizarComponent;
  let fixture: ComponentFixture<EmpregadorAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadorAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadorAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
