import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaGerenciarComponent } from './vaga-gerenciar.component';

describe('VagaGerenciarComponent', () => {
  let component: VagaGerenciarComponent;
  let fixture: ComponentFixture<VagaGerenciarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaGerenciarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaGerenciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
