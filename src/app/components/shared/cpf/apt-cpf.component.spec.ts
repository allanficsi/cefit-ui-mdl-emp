import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptCpfComponent } from './apt-cpf.component';

describe('AptCpfComponent', () => {
  let component: AptCpfComponent;
  let fixture: ComponentFixture<AptCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptCpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
