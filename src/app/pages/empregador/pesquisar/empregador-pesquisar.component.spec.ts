import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadorPesquisarComponent } from './empregador-pesquisar.component';

describe('EmpregadorPesquisarComponent', () => {
  let component: EmpregadorPesquisarComponent;
  let fixture: ComponentFixture<EmpregadorPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadorPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadorPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
