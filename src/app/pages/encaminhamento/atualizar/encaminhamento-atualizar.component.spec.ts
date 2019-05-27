import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaminhamentoAtualizarComponent } from './encaminhamento-atualizar.component';

describe('EncaminhamentoAtualizarComponent', () => {
  let component: EncaminhamentoAtualizarComponent;
  let fixture: ComponentFixture<EncaminhamentoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncaminhamentoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncaminhamentoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
