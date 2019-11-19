import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-sticky-top',
  templateUrl: './pokemon-sticky-top.component.html',
  styleUrls: ['./pokemon-sticky-top.component.scss']
})

export class PokemonStickyTopComponent implements OnInit {
  @Output()
  onKeyPress = new EventEmitter<Event>();
  
  search(event: Event): void {
    this.onKeyPress.emit(event);
  }
  
  @Output()
  onChange = new EventEmitter<Event>();
  
  selectChanged(event: Event): void {
    this.onChange.emit(event);
  }
  
  url: string = 'https://pokeapi.co/api/v2/';

  types: Observable<any>;
  
  constructor(private httpClient: HttpClient) {
    this.getTypes();
  }
  
  ngOnInit() {}

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
}