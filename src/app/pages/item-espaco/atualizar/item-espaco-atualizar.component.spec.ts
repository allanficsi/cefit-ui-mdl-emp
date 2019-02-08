import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEspacoAtualizarComponent } from './item-espaco-atualizar.component';

describe('ItemEspacoAtualizarComponent', () => {
  let component: ItemEspacoAtualizarComponent;
  let fixture: ComponentFixture<ItemEspacoAtualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEspacoAtualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEspacoAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
