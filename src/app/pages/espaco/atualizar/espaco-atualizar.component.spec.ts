import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoAtualizarComponent } from './espaco-atualizar.component';

describe('EspacoAtualizarComponent', () => {
  let component: EspacoAtualizarComponent;
  let fixture: ComponentFixture<EspacoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
