import { Component, OnInit } from "@angular/core";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
  styleUrls: ["./card-page-visits.component.css"],
})
export class CardPageVisitsComponent implements OnInit {
  isLoading: boolean = false;
  pokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private servicePokemon: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  onChangePage(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }

  getPokemons(): void {
    this.isLoading = true;
    this.servicePokemon.getPokemonsPaginated(this.currentPage, this.itemsPerPage)
      .subscribe(response => {
        this.pokemons = response.data;
        this.totalItems = response.totalCount;
        console.log(response);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  onSelectPokemon(pokemonId: number, event: any) {
    if (event.target.checked) {
      // Logic to handle selection
    } else {
      // Logic to handle deselection
    }
  }
}
