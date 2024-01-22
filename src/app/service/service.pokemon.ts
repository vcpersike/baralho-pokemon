import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  public baralhoSource = new BehaviorSubject<number[]>([]);
  public baralhoCard = new BehaviorSubject<string>("");
  public listBaralhoCard = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getPokemon(): Observable<any> {
    const url = "https://api.pokemontcg.io/v2/cards";
    return this.http.get(url);
  }

  getPokemonsPaginated(page: number, itemsPerPage: number): Observable<any> {
    // Substitua pela URL real da sua API
    const url = `https://api.pokemontcg.io/v2/cards?page=${page}&itemsPerPage=${itemsPerPage}`;
    return this.http.get<any>(url);
  }

  private selectedPokemonsSource = new BehaviorSubject<number[]>([]);
  selectedPokemons$ = this.selectedPokemonsSource.asObservable();

  setSelectedPokemons(ids: number[]) {
    this.selectedPokemonsSource.next(ids);
  }

  getBaralho(): Observable<any> {
    return this.baralhoSource.asObservable();
  }

  getBaralhoCard(): Observable<any> {
    return this.baralhoCard.asObservable();
  }

  getListBaralhoCard(): Observable<any> {
    return this.listBaralhoCard.asObservable();
  }
}
