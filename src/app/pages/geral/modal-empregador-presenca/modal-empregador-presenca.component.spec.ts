import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmpregadorPresencaComponent } from './modal-empregador-presenca.component';

describe('ModalEmpregadorPresencaComponent', () => {
  let component: ModalEmpregadorPresencaComponent;
  let fixture: ComponentFixture<ModalEmpregadorPresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmpregadorPresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmpregadorPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
