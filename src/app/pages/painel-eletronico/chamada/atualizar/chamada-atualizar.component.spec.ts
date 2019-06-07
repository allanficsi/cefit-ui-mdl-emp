import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadaAtualizarComponent } from './chamada-atualizar.component';

describe('ChamadaAtualizarComponent', () => {
  let component: ChamadaAtualizarComponent;
  let fixture: ComponentFixture<ChamadaAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadaAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
