import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoAtualizarComponent } from './acao-atualizar.component';

describe('AcaoAtualizarComponent', () => {
  let component: AcaoAtualizarComponent;
  let fixture: ComponentFixture<AcaoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
