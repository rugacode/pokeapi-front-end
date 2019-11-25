import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, merge, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, toArray, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-abilities-modal',
  templateUrl: './pokemon-abilities-modal.component.html',
  styleUrls: ['./pokemon-abilities-modal.component.scss']
})

export class PokemonAbilitiesModalComponent implements OnInit {
  pokemon;

  pokemonAbilities: Observable<any>;

  @Input()
  set abilitiesEvent(pokemon) {
    this.pokemon = pokemon;
    
    if(pokemon)
      this.getPokemonAbilities();
  }
  
  constructor(
    private httpClient: HttpClient
  ) {}
  
  ngOnInit() {}

  getPokemonAbilities() {
    this.pokemonAbilities = from(this.pokemon['abilities'])
    .pipe(
      mergeMap(ability => {
        return this
        .httpClient
        .get(ability['ability']['url'])
        .pipe(
          catchError(() => {
            return empty();
          })
        );
      }),
      toArray()
    );
  }
}