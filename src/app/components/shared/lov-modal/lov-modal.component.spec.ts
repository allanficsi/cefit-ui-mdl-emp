import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovModalComponent } from './lov-modal.component';

describe('LovModalComponent', () => {
  let component: LovModalComponent;
  let fixture: ComponentFixture<LovModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
