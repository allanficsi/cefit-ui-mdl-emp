import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadorRedefinirSenhaComponent } from './empregador-redefinir-senha.component';

describe('EmpregadorRedefinirSenhaComponent', () => {
  let component: EmpregadorRedefinirSenhaComponent;
  let fixture: ComponentFixture<EmpregadorRedefinirSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadorRedefinirSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadorRedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
