import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-editar",
  templateUrl: "./card-editar.component.html",
  styleUrls: ["./card-editar.component.css"],
})
export class EditarComponent implements OnInit {
  erroMensagem: string = "";
  selectedPokemons: number[] = [];
  isLoading: boolean = false;
  pokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  public baralhos: any[] = [];
  public baralho: any;
  constructor(
    private servicePokemon: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.servicePokemon.listBaralhoCard.subscribe((baralhosAtualizados) => {
        this.baralhos = baralhosAtualizados;
        this.baralho = this.baralhos.find((baralho) => baralho.id === id);
      });
    });
    this.getPokemons();
  }
  onChangePage(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }

  getPokemons(): void {
    this.isLoading = true;
    this.servicePokemon
      .getPokemonsPaginated(this.currentPage, this.itemsPerPage)
      .subscribe(
        (response) => {
          this.pokemons = response.data;
          this.totalItems = response.totalCount;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  findPokemonId(pokemonId: number) {
    if (this.baralho && this.baralho.cards && this.baralho.cards.length > 0) {
      const pokemon = this.baralho.cards.find(
        (pokemon) => pokemon.id === pokemonId
      );
      if (pokemon) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  salvarBaralho() {
    const numeroDeCartas = this.baralho.cards.length;

    if (numeroDeCartas < 24 || numeroDeCartas > 60) {
      this.erroMensagem = "O baralho deve ter entre 24 e 60 cartas.";
      return;
    }

    this.baralho.cards = this.pokemons.filter((pokemon) =>
      this.selectedPokemons.includes(pokemon.id)
    );

    const baralhosAtualizados = this.servicePokemon.listBaralhoCard.getValue();
    const index = baralhosAtualizados.findIndex(
      (baralho) => baralho.id === this.baralho.id
    );

    if (index !== -1) {
      baralhosAtualizados[index] = this.baralho;
    } else {
    }

    this.servicePokemon.listBaralhoCard.next(baralhosAtualizados);
  }

  onSelectPokemon(pokemon: any, event: any) {
    if (event.target.checked) {
      if (!this.baralho.cards.includes((pokemon) => pokemon.id === pokemon.id)) {
        this.baralho.cards.push(pokemon);
      }
    } else {
      this.baralho.cards = this.baralho.cards.filter(
        (id) => id !== pokemon
      );
    }
  }
}
