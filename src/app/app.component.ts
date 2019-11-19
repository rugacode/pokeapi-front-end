import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable, forkJoin, range } from 'rxjs';

import { mergeMap, map, concatMap, tap, catchError, bufferCount, scan, shareReplay } from 'rxjs/operators'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = 'PokéInfo';

  url: string = 'https://pokeapi.co/api/v2/';
  
  pokemons: Observable<any>;
  
  constructor(private httpClient: HttpClient, private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.getPokemons();

    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => pokemon.sort(this.orderByAscending))
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

  search(event) {
    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => {
        return pokemon.filter(pokemon => {
          return pokemon.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
      })
    );
    
    //console.log(event.target.value);
  }
  
  selectChanged(event) {
    if(event.target.id === 'name') {
      this.selectNameChanged(event);
    }
    if(event.target.id === 'types') {
      this.selectTypesChanged(event);
    }
  }

  selectNameChanged(event) {
    this.pokemons = this
    .pokemons
    .pipe(
      map(pokemon => {
        if(event.target.value === 'descending')
          return pokemon.sort(this.orderByDescending);
        return pokemon.sort(this.orderByAscending);
      })
    );
  }

  selectTypesChanged(event) {
    this.pokemons = this
    .pokemons
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
  
  getPokemons() {
    this.pokemons = range(1, 210)
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
  
  //getPokemon() {}

  //getPokemonDetails() {}
}