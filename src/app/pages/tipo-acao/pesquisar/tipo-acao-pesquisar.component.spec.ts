import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAcaoPesquisarComponent } from './tipo-acao-pesquisar.component';

describe('TipoAcaoPesquisarComponent', () => {
  let component: TipoAcaoPesquisarComponent;
  let fixture: ComponentFixture<TipoAcaoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAcaoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAcaoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
