import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtivarInativarTrabalhadorComponent } from './modal-ativar-inativar-trabalhador.component';

describe('ModalAtivarInativarTrabalhadorComponent', () => {
  let component: ModalAtivarInativarTrabalhadorComponent;
  let fixture: ComponentFixture<ModalAtivarInativarTrabalhadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAtivarInativarTrabalhadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtivarInativarTrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
