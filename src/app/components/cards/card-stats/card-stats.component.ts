import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
})
export class CardStatsComponent implements OnInit {
  @Input() selectedPokemonIds: string[];
  @Input() statSubtitle: string;
  @Input() statTitle: string;
  @Input() statArrow: string;
  @Input() statPercent: string;
  @Input() statPercentColor: string;
  @Input() statDescripiron: string;
  @Input() statIconName: string;
  @Input() statIconColor: string;

  constructor() {}

  ngOnInit(): void {}

  saveSelection() {
    console.log("Pokémons selecionados:", this.selectedPokemonIds);
  }
}
