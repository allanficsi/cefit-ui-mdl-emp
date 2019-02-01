import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalAtualizarComponent } from './profissional-atualizar.component';

describe('ProfissionalAtualizarComponent', () => {
  let component: ProfissionalAtualizarComponent;
  let fixture: ComponentFixture<ProfissionalAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
