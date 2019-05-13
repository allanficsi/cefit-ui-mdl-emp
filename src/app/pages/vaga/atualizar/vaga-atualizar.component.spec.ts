import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaAtualizarComponent } from './vaga-atualizar.component';

describe('VagaAtualizarComponent', () => {
  let component: VagaAtualizarComponent;
  let fixture: ComponentFixture<VagaAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
