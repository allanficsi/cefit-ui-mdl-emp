import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAcaoAtualizarComponent } from './tipo-acao-atualizar.component';

describe('TipoAcaoAtualizarComponent', () => {
  let component: TipoAcaoAtualizarComponent;
  let fixture: ComponentFixture<TipoAcaoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAcaoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAcaoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
