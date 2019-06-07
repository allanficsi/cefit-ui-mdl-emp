import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuicheAtualizarComponent } from './guiche-atualizar.component';

describe('GuicheAtualizarComponent', () => {
  let component: GuicheAtualizarComponent;
  let fixture: ComponentFixture<GuicheAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuicheAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuicheAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
