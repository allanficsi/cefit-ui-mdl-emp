import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVagaFinalizarComponent } from './modal-vaga-finalizar.component';

describe('ModalVagaFinalizarComponent', () => {
  let component: ModalVagaFinalizarComponent;
  let fixture: ComponentFixture<ModalVagaFinalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVagaFinalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVagaFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
