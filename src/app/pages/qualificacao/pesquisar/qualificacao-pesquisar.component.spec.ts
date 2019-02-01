import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificacaoPesquisarComponent } from './qualificacao-pesquisar.component';

describe('QualificacaoPesquisarComponent', () => {
  let component: QualificacaoPesquisarComponent;
  let fixture: ComponentFixture<QualificacaoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificacaoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificacaoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
