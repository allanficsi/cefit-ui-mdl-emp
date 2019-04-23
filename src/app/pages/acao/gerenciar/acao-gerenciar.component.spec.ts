import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoGerenciarComponent } from './acao-gerenciar.component';

describe('AcaoGerenciarComponent', () => {
  let component: AcaoGerenciarComponent;
  let fixture: ComponentFixture<AcaoGerenciarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaoGerenciarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoGerenciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
