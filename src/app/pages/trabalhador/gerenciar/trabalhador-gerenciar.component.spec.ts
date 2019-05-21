import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorGerenciarComponent } from './trabalhador-gerenciar.component';

describe('TrabalhadorGerenciarComponent', () => {
  let component: TrabalhadorGerenciarComponent;
  let fixture: ComponentFixture<TrabalhadorGerenciarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabalhadorGerenciarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhadorGerenciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
