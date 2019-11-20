import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TypesService } from '../../../services/types.service';

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
  
  types: Observable<any>;
  
  constructor(private httpClient: HttpClient, private typesService: TypesService) {
    this.getTypes();
  }
  
  ngOnInit() {}

  getTypes() {
    this.types = this.typesService.getTypes();
  }
}