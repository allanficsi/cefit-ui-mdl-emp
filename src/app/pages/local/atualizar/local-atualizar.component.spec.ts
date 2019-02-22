import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAtualizarComponent } from './local-atualizar.component';

describe('LocalAtualizarComponent', () => {
  let component: LocalAtualizarComponent;
  let fixture: ComponentFixture<LocalAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
