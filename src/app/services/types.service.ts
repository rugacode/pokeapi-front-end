import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TypesService {
  url: string = 'https://pokeapi.co/api/v2/';

  constructor(private httpClient: HttpClient) {}

  getTypes(): Observable<any> {
    return this
    .httpClient
    .get(`${this.url}type/`)
    .pipe(
      map((types) => {
        return types['results'];
      })
    );
  }
}