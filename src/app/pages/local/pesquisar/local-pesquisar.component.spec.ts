import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalPesquisarComponent } from './local-pesquisar.component';

describe('LocalPesquisarComponent', () => {
  let component: LocalPesquisarComponent;
  let fixture: ComponentFixture<LocalPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
