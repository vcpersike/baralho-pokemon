import { Component, OnInit, Input } from "@angular/core";
import { take } from "rxjs/operators";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  public baralhos: any[] = [];
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
    this.servicePokemon.listBaralhoCard.pipe(
      take(1)
    ).subscribe(baralhosAtualizados => {
      this.baralhos = baralhosAtualizados;
    });
  }

  excluirBaralho(index: number) {
    const currentList = this.servicePokemon.listBaralhoCard.getValue();
    const updatedList = currentList.filter((_, i) => i !== index);
    this.servicePokemon.listBaralhoCard.next(updatedList);
  }
}
