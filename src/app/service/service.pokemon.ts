import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<any> {
    const url = 'https://api.pokemontcg.io/v2/cards';
    return this.http.get(url);
  }

  getPokemonsPaginated(page: number, itemsPerPage: number): Observable<any> {
    // Substitua pela URL real da sua API
    const url = `https://api.pokemontcg.io/v2/cards?page=${page}&itemsPerPage=${itemsPerPage}`;
    return this.http.get<any>(url);
  }

}
