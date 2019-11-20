import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Title } from '@angular/platform-browser';

import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = 'PokéInfo';
  
  pokemons: Observable<any>;
  
  constructor(private titleService: Title, private pokemonService: PokemonService) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.getPokemons();

    this.pokemons = this.pokemonService.ascending(this.pokemons);
  }
  
  getPokemons() {
    this.pokemons = this.pokemonService.getPokemons();
  }
  
  search(event) {
    this.pokemons = this.pokemonService.search(this.pokemons, event);
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
    this.pokemons = this.pokemonService.selectNameChanged(this.pokemons, event);
  }

  selectTypesChanged(event) {
    this.pokemons = this.pokemonService.selectTypesChanged(this.pokemons, event);
  }
  
  public clickedAbilitiesEvent;
  
  childAbilitiesEventClicked(event) {
    this.clickedAbilitiesEvent = event;
  }
}