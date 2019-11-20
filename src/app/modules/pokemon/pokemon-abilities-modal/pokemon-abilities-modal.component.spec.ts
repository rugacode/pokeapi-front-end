import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAbilitiesModalComponent } from './pokemon-abilities-modal.component';

describe('PokemonAbilitiesModalComponent', () => {
  let component: PokemonAbilitiesModalComponent;
  let fixture: ComponentFixture<PokemonAbilitiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonAbilitiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonAbilitiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
