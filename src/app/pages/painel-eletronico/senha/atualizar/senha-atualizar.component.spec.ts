import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaAtualizarComponent } from './senha-atualizar.component';

describe('SenhaAtualizarComponent', () => {
  let component: SenhaAtualizarComponent;
  let fixture: ComponentFixture<SenhaAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhaAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
