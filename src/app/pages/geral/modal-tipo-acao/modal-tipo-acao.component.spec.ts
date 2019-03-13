import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoAcaoComponent } from './modal-tipo-acao.component';

describe('ModalTipoAcaoComponent', () => {
  let component: ModalTipoAcaoComponent;
  let fixture: ComponentFixture<ModalTipoAcaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoAcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
