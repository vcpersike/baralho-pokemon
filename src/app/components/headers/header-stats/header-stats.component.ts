import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  statSubtitle: string;
  statTitle: string;
  statArrow: string;
  statPercent: string;
  statPercentColor: string;
  statDescripiron: string;
  statIconName: string;
  statIconColor: string;

  constructor(private servicePokemon: PokemonService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.statTitle = "BARALHO";
    this.statDescripiron = "Click no icone para salvar seus dados";
    this.statSubtitle = "Baralho em construção";
    this.servicePokemon.selectedPokemons$.subscribe(selectedIds => {
      this.statPercent = selectedIds.length.toString();
      this.updateStatPercentColor();
      this.cdr.detectChanges();
    });
  }

  updateStatPercentColor() {
    const percentValue = parseFloat(this.statPercent);

    if (percentValue < 24) {
      this.statPercentColor = 'text-red-500';
      this.statArrow = 'up';
    } else if (percentValue >= 24 && percentValue <= 60) {
      this.statPercentColor = 'text-emerald-500';
      this.statArrow = 'up';
    } else {
      this.statPercentColor = 'text-red-500';
      this.statArrow = 'down';
    }
  }

}
