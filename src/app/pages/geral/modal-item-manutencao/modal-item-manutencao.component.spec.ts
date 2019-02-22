import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemManutencaoComponent } from './modal-item-manutencao.component';

describe('ModalItemManutencaoComponent', () => {
  let component: ModalItemManutencaoComponent;
  let fixture: ComponentFixture<ModalItemManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
