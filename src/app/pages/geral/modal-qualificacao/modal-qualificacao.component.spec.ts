import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQualificacaoComponent } from './modal-qualificacao.component';

describe('ModalQualificacaoComponent', () => {
  let component: ModalQualificacaoComponent;
  let fixture: ComponentFixture<ModalQualificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQualificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQualificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
