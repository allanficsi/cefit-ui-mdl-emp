import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSenhaPesquisarComponent } from './tipo-senha-pesquisar.component';

describe('TipoSenhaPesquisarComponent', () => {
  let component: TipoSenhaPesquisarComponent;
  let fixture: ComponentFixture<TipoSenhaPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSenhaPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSenhaPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
