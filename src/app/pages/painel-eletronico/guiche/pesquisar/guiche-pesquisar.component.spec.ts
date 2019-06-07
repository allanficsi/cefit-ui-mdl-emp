import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuichePesquisarComponent } from './guiche-pesquisar.component';

describe('GuichePesquisarComponent', () => {
  let component: GuichePesquisarComponent;
  let fixture: ComponentFixture<GuichePesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuichePesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuichePesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
