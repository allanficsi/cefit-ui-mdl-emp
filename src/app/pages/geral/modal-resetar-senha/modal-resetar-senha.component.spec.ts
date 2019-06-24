import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResetarSenhaComponent } from './modal-resetar-senha.component';

describe('ModalResetarSenhaComponent', () => {
  let component: ModalResetarSenhaComponent;
  let fixture: ComponentFixture<ModalResetarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResetarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResetarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
