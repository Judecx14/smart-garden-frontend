import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SensorsService} from '../../../services/sensors/sensors.service';
import {Sensor} from '../../../classes/sensor';
import {FlowerpotSensor} from '../../../classes/flowerpot-sensor';
import {formatDate} from '@angular/common';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  private dataTemp: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataHum: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataDate: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];

  constructor(private router: ActivatedRoute, private sensorService: SensorsService) {
  }

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

  public barChartLabels: Label[] = this.dataDate;
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


  data;
  params: Params;
  sensor: Sensor = new Sensor();
  flowerpotSensor: FlowerpotSensor = new FlowerpotSensor();
  sensors: Array<any>;
  lastTemp: string;
  lastTime: string;
  lastHum: string;
  lastGHum: string;
  lastGTime: string;
  DHT;
  HL69;
  ML85;
  WatPump;

  DHTMT: Array<any> = [];
  DHTMH: Array<any> = [];
  HL69M: Array<any> = [];
  ML85M: Array<any> = [];
  WatPumpM: Array<any> = [];
  selectDate: Date = null;
  selectDate2: Date = null;

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

  ngOnInit(): void {
    // @ts-ignore
    this.params = this.router.snapshot.params;
    this.getData();
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(date);
  }

  getData(): void {
    if (this.selectDate && this.selectDate2) {
      const d1 = formatDate(this.selectDate, 'yyyy-MM-dd', 'en');
      const d2 = formatDate(this.selectDate2, 'yyyy-MM-dd', 'en');
      console.log(d1, d2);
      this.sensorService.showFlowerpotSensorsMeasure(this.params.id, d1, d2).subscribe(data => {
        this.data = data;
        this.sensors = data.sensors;
        for (const item of this.sensors) {
          if (item.sensor.type === 'DHT-11') {
            this.DHT = item;
            if (this.DHT.measure[0]) {
              const array = this.DHT.measure.slice().reverse();
              this.lastTemp = array[0].measurements.temperature;
              this.lastTime = array[0].created_at.slice(11, -5);
              this.lastHum = array[0].measurements.humidity;
            } else {
              console.log('sin datos coincidentes');
            }
          } else if (item.sensor.type === 'HL-69') {
            this.HL69 = item;
          } else if (item.sensor.type === 'ML85') {
            this.ML85 = item;
          } else if (item.sensor.type === 'WaterPump') {
            this.WatPump = item;
          }
          // console.log(item);
          // console.log(this.DHT);
        }
        this.dhtMeasure();
      });
    } else {
      const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      const year = new Date().getFullYear();
      const day = new Date().getDate() + 1;
      const month = new Date().getMonth() + 1;
      const date2 = year + '-' + month + '-' + day;
      this.sensorService.showFlowerpotSensorsMeasure(this.params.id, date, date2).subscribe(data => {
          this.data = data;
          this.sensors = data.sensors;
          for (const item of this.sensors) {
            if (item.sensor.type === 'DHT-11') {
              this.DHT = item;
              const array = this.DHT.measure.slice().reverse();
              this.lastTemp = array[0].measurements.temperature;
              this.lastTime = array[0].created_at.slice(11, -5);
              this.lastHum = array[0].measurements.humidity;
            } else if (item.sensor.type === 'HL-69') {
              this.HL69 = item;
            } else if (item.sensor.type === 'ML85') {
              this.ML85 = item;
            } else if (item.sensor.type === 'WaterPump') {
              this.WatPump = item;
            }
            // console.log(item);
            // console.log(this.DHT);
          }
          this.dhtMeasure();
        }
      );
    }
  }

  addSensor(): void {
    this.sensorService.createSensor(this.sensor).subscribe(data => {
      this.flowerpotSensor.IDFlowerpot = this.params.id;
      this.flowerpotSensor.IDSensor = data.id;
      this.sensor = new Sensor();
      // console.log(this.flowerpotSensor);
      this.sensorService.createFlowerpotSensor(this.flowerpotSensor).subscribe(resp => {
        this.getData();
      });
    });
  }

  dhtMeasure(): void {
    for (const item of this.DHT.measure) {
      this.dataTemp.push(item.measurements.temperature);
    }
    for (const item of this.DHT.measure) {
      this.dataHum.push(item.measurements.humidity);
    }
    for (const item of this.DHT.measure) {
      this.dataDate.push(item.created_at.slice(11, -5));
    }
    // console.log(this.DHTMT, this.DHTMH);
  }
}
