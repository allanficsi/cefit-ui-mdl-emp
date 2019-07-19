import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptCpfExternoComponent } from './apt-cpf-externo.component';

describe('AptCpfExternoComponent', () => {
  let component: AptCpfExternoComponent;
  let fixture: ComponentFixture<AptCpfExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptCpfExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptCpfExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
