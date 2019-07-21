import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpregadorRejeicaoComponent } from './modal-empregador-rejeicao.component';

describe('ModalEmpregadorRejeicaoComponent', () => {
  let component: ModalEmpregadorRejeicaoComponent;
  let fixture: ComponentFixture<ModalEmpregadorRejeicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmpregadorRejeicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpregadorRejeicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
