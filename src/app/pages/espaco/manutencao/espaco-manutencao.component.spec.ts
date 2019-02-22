import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoManutencaoComponent } from './espaco-manutencao.component';

describe('EspacoManutencaoComponent', () => {
  let component: EspacoManutencaoComponent;
  let fixture: ComponentFixture<EspacoManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacoManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacoManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
