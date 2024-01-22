import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
})
export class CardStatsComponent implements OnInit {
  baralho: {
    name: string;
    cards: any[];
    number: number;
  } = {
    name: "",
    cards: [],
    number: 0,
  };
  baralhos: string[] = [];
  @Input() statTitle: string;
  @Output() statTitleChange = new EventEmitter<string>();
  isEditing: boolean = false;
  @Input() selectedPokemonIds: string[];
  @Input() statSubtitle: string;
  @Input() statArrow: string;
  @Input() statPercent: string;
  @Input() statPercentColor: string;
  @Input() statDescripiron: string;
  @Input() statIconName: string;
  @Input() statIconColor: string;

  constructor(private servicePokemon: PokemonService) {}

  ngOnInit(): void {}

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveTitle(newTitle: string) {
    this.statTitle = newTitle;
    this.toggleEdit();
  }

  saveSelection() {
    this.servicePokemon.getBaralho().subscribe((baralhos) => {
      this.baralhos = baralhos;
    });
    this.servicePokemon.baralhoCard.next(this.statTitle);
    this.servicePokemon.listBaralhoCard.next([{
      name: this.statTitle,
      cards: this.baralhos,
      number: this.baralhos.length,
    }]);
  }
}
