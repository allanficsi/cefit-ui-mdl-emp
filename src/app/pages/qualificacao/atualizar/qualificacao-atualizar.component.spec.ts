import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificacaoAtualizarComponent } from './qualificacao-atualizar.component';

describe('QualificacaoAtualizarComponent', () => {
  let component: QualificacaoAtualizarComponent;
  let fixture: ComponentFixture<QualificacaoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificacaoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificacaoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
