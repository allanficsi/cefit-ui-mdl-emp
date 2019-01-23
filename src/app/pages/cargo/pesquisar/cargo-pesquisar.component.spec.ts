import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPesquisarComponent } from './cargo-pesquisar.component';

describe('CargoPesquisarComponent', () => {
  let component: CargoPesquisarComponent;
  let fixture: ComponentFixture<CargoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
