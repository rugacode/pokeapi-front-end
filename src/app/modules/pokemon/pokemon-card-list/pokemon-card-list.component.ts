import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
  styleUrls: ['./pokemon-card-list.component.scss']
})

export class PokemonCardListComponent implements OnInit {
  @Input()
  pokemon;
  
  @Output()
  abilitiesEventClicked = new EventEmitter<Event>();
  
  onAbilitiesClick(event: Event): void {
    this.abilitiesEventClicked.emit(this.pokemon);
  }
  
  show: boolean = false;
  
  onImageLoad() {
    this.show = true;
  }
  
  constructor() {}
  
  ngOnInit() {}
}