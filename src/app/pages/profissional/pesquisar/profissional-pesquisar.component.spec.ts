import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalPesquisarComponent } from './profissional-pesquisar.component';

describe('ProfissionalPesquisarComponent', () => {
  let component: ProfissionalPesquisarComponent;
  let fixture: ComponentFixture<ProfissionalPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
