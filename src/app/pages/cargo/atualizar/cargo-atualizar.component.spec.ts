import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoAtualizarComponent } from './cargo-atualizar.component';

describe('CargoAtualizarComponent', () => {
  let component: CargoAtualizarComponent;
  let fixture: ComponentFixture<CargoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
