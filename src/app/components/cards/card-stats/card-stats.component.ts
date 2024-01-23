import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { take } from "rxjs/operators";
import { PokemonService } from "src/app/service/service.pokemon";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: "app-card-stats",
  templateUrl: "./card-stats.component.html",
})
export class CardStatsComponent implements OnInit {
  erroMensagem: string = '';
  baralho: {
    id: string;
    name: string;
    cards: any[];
    number: number;
  } = {
    id: uuidv4(),
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
    this.servicePokemon.getBaralho().pipe(
      take(1)
    ).subscribe((baralhos) => {
      const nomeContagem = new Map();

      for (const baralho of baralhos) {
        if (!baralho.nome) {
          continue;
        }

        const contagem = nomeContagem.get(baralho.nome) || 0;
        if (contagem >= 4) {
          this.erroMensagem = `O nome ${baralho.nome} já aparece 4 vezes.`;
          return;
        }

        nomeContagem.set(baralho.nome, contagem + 1);
      }

      const numeroDeCartas = baralhos.length;
      if (numeroDeCartas < 24 || numeroDeCartas > 60) {
        this.erroMensagem = "O baralho deve ter entre 24 e 60 cartas.";
        return;
      }else {
        this.erroMensagem = '';
      }

      const novoBaralho = {
        id: uuidv4(),
        name: this.statTitle,
        cards: baralhos,
        number: numeroDeCartas,
      };

      const currentList = this.servicePokemon.listBaralhoCard.getValue();
      const updatedList = [...currentList, novoBaralho];
      this.servicePokemon.listBaralhoCard.next(updatedList);

      this.servicePokemon.baralhoCard.next(this.statTitle);
    });
  }

}
