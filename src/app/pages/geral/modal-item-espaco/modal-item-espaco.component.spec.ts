import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemEspacoComponent } from './modal-item-espaco.component';

describe('ModalItemEspacoComponent', () => {
  let component: ModalItemEspacoComponent;
  let fixture: ComponentFixture<ModalItemEspacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemEspacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
