import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTelefoneComponent } from './modal-telefone.component';

describe('ModalTelefoneComponent', () => {
  let component: ModalTelefoneComponent;
  let fixture: ComponentFixture<ModalTelefoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTelefoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
