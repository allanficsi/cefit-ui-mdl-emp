import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadorCadastroComponent } from './empregador-cadastro.component';

describe('EmpregadorCadastroComponent', () => {
  let component: EmpregadorCadastroComponent;
  let fixture: ComponentFixture<EmpregadorCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadorCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
