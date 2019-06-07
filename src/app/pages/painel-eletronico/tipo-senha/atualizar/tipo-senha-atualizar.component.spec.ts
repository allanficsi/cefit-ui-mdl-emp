import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSenhaAtualizarComponent } from './tipo-senha-atualizar.component';

describe('TipoSenhaAtualizarComponent', () => {
  let component: TipoSenhaAtualizarComponent;
  let fixture: ComponentFixture<TipoSenhaAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSenhaAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSenhaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
