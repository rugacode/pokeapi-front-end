import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getPokemon(url): Observable<any> {
    return this
    .httpClient
    .get(`${url}`)
    .pipe(
      map(pokemon => {
        return pokemon;
      }),
      catchError(error => {
        return empty();
      })
    );
  }
}