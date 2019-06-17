import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterarSituacaoTrabalhadorComponent } from './modal-alterar-situacao-trabalhador.component';

describe('ModalAtivarInativarTrabalhadorComponent', () => {
  let component: ModalAlterarSituacaoTrabalhadorComponent;
  let fixture: ComponentFixture<ModalAlterarSituacaoTrabalhadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlterarSituacaoTrabalhadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlterarSituacaoTrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
