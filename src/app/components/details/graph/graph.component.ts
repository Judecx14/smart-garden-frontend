import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {

  @Input() dataTemp: Array<any> = [];
  @Input() dataHum: Array<any> = [];
  @Input() dataHL69: Array<any> = [];
  @Input() dataML85: Array<any> = [];
  @Input() dataWP: Array<any> = [];

  constructor() {
  }

  // ===========GRAFICA DE BARRAS============

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartLabels: Label[] = [
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [pluginDataLabels];
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: this.dataTemp,
      label: 'Temperatura',
      backgroundColor: '#31e15f',
      hoverBackgroundColor: '#31e15f',
    },
    {
      data: this.dataHum,
      label: 'Humedad',
      backgroundColor: '#26bba7',
      hoverBackgroundColor: '#26bba7',
    },
  ];

  ngOnInit(): void {
    // console.log(this.dataHum, this.dataTemp);
  }

  // events

  public chartClicked({
                        event,
                        active,
                      }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    console.log(this.dataTemp, this.dataHum);
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40,
    ];
  }

  // ============FIN GRAFICA DE BARRAS===============
}
