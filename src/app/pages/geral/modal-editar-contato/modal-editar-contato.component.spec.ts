import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarContatoComponent } from './modal-editar-contato.component';

describe('ModalEditarContatoComponent', () => {
  let component: ModalEditarContatoComponent;
  let fixture: ComponentFixture<ModalEditarContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
