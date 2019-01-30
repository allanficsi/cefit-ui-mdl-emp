import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorPesquisarComponent } from './trabalhador-pesquisar.component';

describe('TrabalhadorPesquisarComponent', () => {
  let component: TrabalhadorPesquisarComponent;
  let fixture: ComponentFixture<TrabalhadorPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabalhadorPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhadorPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
