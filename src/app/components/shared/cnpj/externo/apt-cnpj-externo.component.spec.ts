import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptCnpjExternoComponent } from './apt-cnpj-externo.component';

describe('AptCnpjExternoComponent', () => {
  let component: AptCnpjExternoComponent;
  let fixture: ComponentFixture<AptCnpjExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptCnpjExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptCnpjExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
