import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

import { PokemonsService } from './services/pokemons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = 'PokéInfo';
  
  pokemons$ = new Observable<any[]>();
  
  subjects$ = new BehaviorSubject<any[]>([]);
  
  intersectionObserver: IntersectionObserver;
  
  constructor(
    private titleService: Title,
    private pokemonsService: PokemonsService
  ) {
    this.titleService.setTitle(this.title);
  }
  
  ngOnInit(): void {
    this.pokemons$ = this.subjects$.asObservable();
    
    this
    .pokemonsService
    .getPokemons()
    .subscribe(pokemons => {
      this.subjects$.next(pokemons);
    });
    
    const footer = document.querySelector('app-footer');
    
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && this.pokemonsService.url !== null) {
          
          this
          .pokemonsService
          .getPokemons()
          .subscribe(previousPokemons => {
            
            this
            .pokemonsService
            .getNextPokemons(this.subjects$)
            .subscribe((nextPokemons) => {
              nextPokemons.push(...previousPokemons);
              
              this.subjects$.next(nextPokemons);
            });
          
          });
          
        }
      });
    });
    
    this.intersectionObserver.observe(footer);
  }
  
  search(event) {
    this.pokemons$ = this.pokemonsService.search(this.pokemons$, event);
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
    this.pokemons$ = this.pokemonsService.selectNameChanged(this.pokemons$, event);
  }

  selectTypesChanged(event) {
    this.pokemons$ = this.pokemonsService.selectTypesChanged(this.pokemons$, event);
  }
  
  public clickedAbilitiesEvent;
  
  childAbilitiesEventClicked(event) {
    this.clickedAbilitiesEvent = event;
  }
}