import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  multiTypeCount: number = 0;
  constructor(private servicePokemon: PokemonService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.pokemon();
  }

  public pokemon() {
    this.servicePokemon.getPokemon().subscribe((data) => {
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

      data.data.forEach((pokemon) => {
        if (pokemon.types.length > 1) {
          this.multiTypeCount++;
        }

        if (Array.isArray(pokemon.types)) {
          pokemon.types.forEach((type) => {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
          });
        }

        if (Array.isArray(pokemon.resistances)) {
          pokemon.resistances.forEach((resistance) => {
            if (
              resistance.value !== "0" &&
              resistanceCounts.hasOwnProperty(resistance.type)
            ) {
              resistanceCounts[resistance.type]++;
            }
          });
        }
      });

      const typeLabels = Object.keys(typeCounts);
      const typeData = Object.values(typeCounts);
      const resistanceData = Object.values(resistanceCounts);
      let config = {
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
      };
      let ctx: any = document.getElementById("bar-chart");
      ctx = ctx.getContext("2d");
      new Chart(ctx, config);
    });
  }
}
