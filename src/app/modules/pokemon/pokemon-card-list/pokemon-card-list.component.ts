import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-list',
  templateUrl: './pokemon-card-list.component.html',
  styleUrls: ['./pokemon-card-list.component.scss']
})

export class PokemonCardListComponent implements OnInit {
  @Input()
  pokemon;
  
  show: boolean = false;
  
  onImageLoad() {
    this.show = true;
  }
  
  constructor() {}
  
  ngOnInit() {}
}