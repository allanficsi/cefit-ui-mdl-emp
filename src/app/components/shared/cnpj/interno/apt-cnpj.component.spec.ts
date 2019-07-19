import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptCnpjComponent } from './apt-cnpj.component';

describe('AptCnpjExternoComponent', () => {
  let component: AptCnpjComponent;
  let fixture: ComponentFixture<AptCnpjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptCnpjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptCnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
