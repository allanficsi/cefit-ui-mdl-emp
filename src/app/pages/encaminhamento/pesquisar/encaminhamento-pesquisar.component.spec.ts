import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaminhamentoPesquisarComponent } from './encaminhamento-pesquisar.component';

describe('EncaminhamentoPesquisarComponent', () => {
  let component: EncaminhamentoPesquisarComponent;
  let fixture: ComponentFixture<EncaminhamentoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncaminhamentoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncaminhamentoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
