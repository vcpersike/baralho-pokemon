import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import Chart from "chart.js";
import { PokemonService } from "src/app/service/service.pokemon";
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  multiTypeCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10; // ajuste conforme necessário
  totalItems: number = 0;
  myChart: Chart;
  isLoading: boolean = false;
  constructor(private servicePokemon: PokemonService, private changeDetectorRef: ChangeDetectorRef,) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.updateState();
    this.getPokemons();
  }

  ngOnDestroy() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  private updateState(): void {
    this.isLoading = true; // ou false
    this.changeDetectorRef.detectChanges();
  }

  onChangePage(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }

  private processData(pokemons: any[]): void {
    const typeCounts = {};
    const resistanceCounts = {
      Metal: 0,
      Grass: 0,
      Lightning: 0,
      Dragon: 0,
      Darkness: 0,
      Colorless: 0,
      Psychic: 0,
      Fire: 0,
      Water: 0,
      Fighting: 0,
    };

    pokemons.forEach((pokemon) => {
      if (pokemon.types && Array.isArray(pokemon.types) && pokemon.types.length > 1) {
        this.multiTypeCount++;
      }
    });

    pokemons.forEach((pokemon) => {
      if (Array.isArray(pokemon.types)) {
        pokemon.types.forEach((type) => {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
      }

      if (Array.isArray(pokemon.resistances)) {
        pokemon.resistances.forEach((resistance) => {
          if (resistance.value !== "0" && resistanceCounts.hasOwnProperty(resistance.type)) {
            resistanceCounts[resistance.type]++;
          }
        });
      }
    });
    const typeLabels = Object.keys(typeCounts);

    this.updateChartData(typeCounts, resistanceCounts, typeLabels);
  }

  private updateChartData(typeCounts: object, resistanceCounts: object, typeLabels: string[]): void {
    const typeData = Object.values(typeCounts);
    const resistanceData = Object.values(resistanceCounts);
    const canvas = document?.getElementById('bar-chart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!this.myChart) {
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: typeLabels,
          datasets: [
            {
              label: "Count of Pokemon Types",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: typeData,
              fill: false,
              barThickness: 8,
            },
            {
              label: "Count of Pokemon Resistance Types",
              backgroundColor: "#afftrff",
              borderColor: "#afftrff",
              data: resistanceData,
              fill: false,
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      });
    } else {
      this.myChart.data.labels = typeLabels;
      this.myChart.data.datasets[0].data = typeData;
      this.myChart.data.datasets[1].data = resistanceData;
      this.myChart.update();
    }
  }

  public getPokemons(): void {
    this.isLoading = true;
    this.servicePokemon.getPokemonsPaginated(this.currentPage, this.itemsPerPage)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(response => {
        this.totalItems = response.totalCount;
        this.processData(response.data);
      }, error => {
        console.error('Erro ao carregar os dados:', error);
      });
  }
}
