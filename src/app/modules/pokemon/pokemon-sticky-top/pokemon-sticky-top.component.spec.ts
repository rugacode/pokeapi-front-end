import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStickyTopComponent } from './pokemon-sticky-top.component';

describe('PokemonStickyTopComponent', () => {
  let component: PokemonStickyTopComponent;
  let fixture: ComponentFixture<PokemonStickyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStickyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStickyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
