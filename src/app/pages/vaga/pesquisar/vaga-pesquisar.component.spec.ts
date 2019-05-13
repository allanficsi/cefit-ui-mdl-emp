import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaPesquisarComponent } from './vaga-pesquisar.component';

describe('VagaPesquisarComponent', () => {
  let component: VagaPesquisarComponent;
  let fixture: ComponentFixture<VagaPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
