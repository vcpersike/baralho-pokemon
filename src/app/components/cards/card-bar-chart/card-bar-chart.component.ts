import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { PokemonService } from "src/app/service/service.pokemon";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  constructor(private servicePokemon: PokemonService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pokemon();
  }

  public pokemon() {
    this.servicePokemon.getPokemon().subscribe((data) => {
      const typeCounts = data.data.reduce((acc, pokemon) => {
        pokemon.types.forEach(type => {
          const existingType = acc.find(t => t.type === type);
          if (existingType) {
            existingType.count += 1;
          } else {
            acc.push({ type: type, count: 1 });
          }
        });
        return acc;
      }, []);

      const labels = typeCounts.map(t => t.type);
      const dataCounts = typeCounts.map(t => t.count);

      let config = {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Count of Pokemon Types",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: dataCounts,
              fill: false,
              barThickness: 8,
            },
            {
              label: "Count of Pokemon Damage Types",
              backgroundColor: "#ffffff",
              borderColor: "#ffffff",
              data: dataCounts,
              fill: false,
              barThickness: 8,
            },
            {
              label: "Count of Pokemon Damage Types",
              backgroundColor: "#pppppp",
              borderColor: "#pppppp",
              data: dataCounts,
              fill: false,
              barThickness: 8,
            }
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
