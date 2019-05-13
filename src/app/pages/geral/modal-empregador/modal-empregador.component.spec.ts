import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpregadorComponent } from './modal-empregador.component';

describe('ModalEmpregadorComponent', () => {
  let component: ModalEmpregadorComponent;
  let fixture: ComponentFixture<ModalEmpregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmpregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
