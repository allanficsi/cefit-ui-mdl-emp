import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAgendaComponent } from './modal-editar-agenda.component';

describe('ModalEditarAgendaComponent', () => {
  let component: ModalEditarAgendaComponent;
  let fixture: ComponentFixture<ModalEditarAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
