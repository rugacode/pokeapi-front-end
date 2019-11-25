import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap, toArray, catchError, take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonsService {
  private offset: number = 0;
  
  private limit: number = 20;
  
  public url: string = `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`;
  
  constructor(
    private httpClient: HttpClient,
    private pokemonService: PokemonService
  ) {}

  getPokemons(): Observable<any[]> {
    return this
    .httpClient
    .get(`${this.url}`)
    .pipe(
      mergeMap(pokemons => {
        this.url = pokemons['next'];
        
        return from(pokemons['results'])
        .pipe(
          mergeMap(pokemons => {
            return this.pokemonService.getPokemon(pokemons['url']);
          }),
          toArray()
        );
      
      }),
      catchError(error => {
        return [];
      })
    );
  }

  getNextPokemons(subjects$): Observable<any[]> {
    return subjects$
    .pipe(
      take(1)
    );
  }

  search(pokemons: Observable<any>, event) {
    return pokemons
    .pipe(
      map(pokemon => {
        return pokemon.filter(pokemon => {
          return pokemon.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
      })
    );
  }
  
  selectNameChanged(pokemons: Observable<any>, event) {
    return pokemons
    .pipe(
      map(pokemon => {
        if(event.target.value === 'descending')
          return pokemon.sort(this.orderByDescending);
        return pokemon.sort(this.orderByAscending);
      })
    );
  }

  selectTypesChanged(pokemons: Observable<any>, event) {
    return pokemons
    .pipe(
      map(pokemon => {
        return pokemon.filter(pokemon => {
          if(event.target.value === 'default')
            return true;
            
          for(let i = 0; i < pokemon.types.length; i++) {
            if(event.target.value === pokemon.types[i].type.name) {
              return true;
            }
          }
          
          return false;
        });
      })
    );
  }
  
  orderByAscending(a, b) {
    if(a.name < b.name)
      return -1;
    if(a.name > b.name)
      return 1;
    return 0;
  }
  
  orderByDescending(a, b) {
    if(a.name < b.name)
      return 1;
    if(a.name > b.name)
      return -1;
    return 0;
  }
}