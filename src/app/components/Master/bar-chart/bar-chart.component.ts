import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SensorsService} from '../../../services/sensors/sensors.service';
import {ChartDataSets, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data;
  dataTemp = [];
  dataHum = [];
  dataLab = [];
  dataGHUM = [];
  dataUVI = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Temperatura',
      backgroundColor: '#31e15f',
      hoverBackgroundColor: '#31e15f',
    },
    {
      data: [],
      label: 'Humedad',
      backgroundColor: '#26bba7',
      hoverBackgroundColor: '#26bba7',
    },
  ];
  public barChartLabels = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLegend = true;
  public barChartType = 'bar';

  constructor(private sensorService: SensorsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue !== changes.data.previousValue) {
      console.log(this.data);
      if (this.data.measure) {
        if (this.data.data.type === 'DHT-11') {
          for (const d of this.data.measure) {
            this.dataTemp.push(d.measurements.temperature);
          }
          for (const d of this.data.measure) {
            this.dataHum.push(d.measurements.humidity);
          }
          for (const d of this.data.measure) {
            this.dataLab.push(d.created_at.slice(5, -14));
          }
          this.barChartData[0].data = this.dataTemp.slice().reverse().slice(0, 10);
          this.barChartData[1].data = this.dataHum.slice().reverse().slice(0, 10);
          this.barChartLabels = this.dataLab.slice().reverse().slice(0, 10);
        }
        if (this.data.data.type === 'HL-69') {
          for (const d of this.data.measure) {
            this.dataGHUM.push(d.measurements.grHumidity);
          }
          for (const d of this.data.measure) {
            this.dataLab.push(d.created_at.slice(5, -14));
          }
          this.barChartData = [
            {
              data: [],
              label: 'Humedad de la tierra',
              backgroundColor: '#31e15f',
              hoverBackgroundColor: '#31e15f',
            }
          ];
          this.barChartData[0].data = this.dataGHUM.slice().reverse().slice(0, 10);
          this.barChartLabels = this.dataLab.slice().reverse().slice(0, 10);
        }
        if (this.data.data.type === 'ML85') {
          for (const d of this.data.measure) {
            this.dataUVI.push(d.measurements.uvIntensity);
          }
          for (const d of this.data.measure) {
            this.dataLab.push(d.created_at.slice(5, -14));
          }
          this.barChartData = [
            {
              data: [],
              label: 'Indice UV',
              backgroundColor: '#31e15f',
              hoverBackgroundColor: '#31e15f',
            }
          ];
          this.barChartData[0].data = this.dataUVI.slice().reverse().slice(0, 10);
          this.barChartLabels = this.dataLab.slice().reverse().slice(0, 10);
        }
      }
    }
  }
}
