import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { range, forkJoin, Observable } from 'rxjs';
import { map, bufferCount, concatMap, scan, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  url: string = 'https://pokeapi.co/api/v2/';

  constructor(private httpClient: HttpClient) {}
  
  getPokemons(): Observable<any> {
    return range(1, 210)
    .pipe(
      map(id => {
        return this
        .httpClient
        .get(`${this.url}pokemon/${id}/`)
      }),
      bufferCount(20),
      concatMap(
        res => forkJoin(res)
      ),
      scan((acc, curr) => {
        acc.push(...curr);
        
        return acc;
      }, []),
      shareReplay()
    );
  }
  
  ascending(pokemons: Observable<any>) {
    return pokemons
    .pipe(
      map(pokemon => pokemon.sort(this.orderByAscending))
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