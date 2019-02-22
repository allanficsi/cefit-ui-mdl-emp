import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoPesquisarComponent } from './espaco-pesquisar.component';

describe('EspacoPesquisarComponent', () => {
  let component: EspacoPesquisarComponent;
  let fixture: ComponentFixture<EspacoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspacoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
