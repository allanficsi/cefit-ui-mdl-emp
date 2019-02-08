import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEspacoPesquisarComponent } from './item-espaco-pesquisar.component';

describe('ItemEspacoPesquisarComponent', () => {
  let component: ItemEspacoPesquisarComponent;
  let fixture: ComponentFixture<ItemEspacoPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEspacoPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEspacoPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
