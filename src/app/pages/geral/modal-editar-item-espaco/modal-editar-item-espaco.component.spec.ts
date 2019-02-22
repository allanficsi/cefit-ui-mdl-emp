import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarItemEspacoComponent } from './modal-editar-item-espaco.component';

describe('ModalEditarItemEspacoComponent', () => {
  let component: ModalEditarItemEspacoComponent;
  let fixture: ComponentFixture<ModalEditarItemEspacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarItemEspacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarItemEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
