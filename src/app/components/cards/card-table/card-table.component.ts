import { Component, OnInit, Input } from "@angular/core";
import { Baralho } from "./baralho-interface";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  baralhos: Baralho[] = [];

  @Input() selectedPokemonIds: string[];
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private servicePokemon: PokemonService) {}

  ngOnInit(): void {
    this.servicePokemon.getListBaralhoCard().subscribe((baralho) => {
      this.baralhos = baralho;
      console.log(this.baralhos);
    });
  }
}
