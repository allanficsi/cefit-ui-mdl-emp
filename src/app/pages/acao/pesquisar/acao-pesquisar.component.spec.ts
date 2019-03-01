import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoPesquisarComponent } from './acao-pesquisar.component';

describe('AcaoPesquisarComponent', () => {
  let component: AcaoPesquisarComponent;
  let fixture: ComponentFixture<AcaoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
