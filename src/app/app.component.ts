import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable, forkJoin, range } from 'rxjs';

import { mergeMap, map, concatMap, tap, catchError, bufferCount, scan, shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'pokeapi-front-end';

  url = 'https://pokeapi.co/api/v2/';
  
  pokemons: Observable<any>;

  types: Observable<any>;
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getPokemons();

    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => pokemon.sort(this.sortAscending))
    );

    this.getTypes();
  }
  
  /*orderBy(type, a, b) {
    if(type === 2)
      return b - a;
    return a - b;
  }*/
  
  sortAscending(a, b) {
    if(a.name < b.name)
      return -1;
    if(a.name > b.name)
      return 1;
    return 0;
  }

  sortDescending(a, b) {
    if(a.name < b.name)
      return 1;
    if(a.name > b.name)
      return -1;
    return 0;
  }
  
  selectChanged(e) {
    //this.getPokemons();
    
    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => {
        if(e.target.value === '2')
          return pokemon.sort(this.sortDescending);
        return pokemon.sort(this.sortAscending);
      })
    );

    console.log(e.target.value);
  }

  selectTypesChanged(event) {
    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => {
        return pokemon.filter(pokemon => {
          //console.log(pokemon.types);
          
          for(let i = 0; i < pokemon.types.length; i++) {
            //console.log(pokemon.types[i].type.name);
            if(pokemon.types[i].type.name === event.target.value) {
              return true;
            }
          }
          
          return false;
        });
      })
    );
  }
  
  getPokemons() {
    this.pokemons = range(1, 100)
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

  getTypes() {
    this.types = this
    .httpClient
    .get(`${this.url}type/`)
    .pipe(
      map((types) => {
        //console.log(types['results']);
        return types['results'];
      })
    );
  }

  //getPokemon() {}

  //getPokemonDetails() {}
}