import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorAtualizarComponent } from './trabalhador-atualizar.component';

describe('TrabalhadorAtualizarComponent', () => {
  let component: TrabalhadorAtualizarComponent;
  let fixture: ComponentFixture<TrabalhadorAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabalhadorAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhadorAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
