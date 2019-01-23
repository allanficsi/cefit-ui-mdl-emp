import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargoComponent } from './modal-cargo.component';

describe('ModalCargoComponent', () => {
  let component: ModalCargoComponent;
  let fixture: ComponentFixture<ModalCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
