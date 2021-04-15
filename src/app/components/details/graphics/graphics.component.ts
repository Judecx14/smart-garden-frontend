import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SensorsService} from '../../../services/sensors/sensors.service';
import {Sensor} from '../../../classes/sensor';
import {FlowerpotSensor} from '../../../classes/flowerpot-sensor';
import {formatDate} from '@angular/common';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  private dataTemp: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataHum: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataDate: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataDate2: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataDate3: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataHumG: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];
  private dataUV: any | Array<number | number[] | null | undefined> | Chart.ChartPoint[] = [];

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
  IDDHT: number;
  IDHL: number;
  IDML: number;
  lastTemp: string;
  lastTime: string;
  lastTime2: string;
  lastTime3: string;
  lastHum: string;
  lastHumG: string;
  lastluzUV: string;
  DHT;
  HL69;
  ML85;
  WatPump;

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
    this.setData();
  }

  setData(): void {
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const year = new Date().getFullYear();
    const day = new Date().getDate() + 1;
    const month = new Date().getMonth() + 1;
    const date2 = year + '-' + month + '-' + day;
    this.getData(date, date2);
  }

  addSensor(): void {
    this.sensorService.createSensor(this.sensor).subscribe(data => {
      this.flowerpotSensor.IDFlowerpot = this.params.id;
      this.flowerpotSensor.IDSensor = data.id;
      this.sensor = new Sensor();
      this.sensorService.createFlowerpotSensor(this.flowerpotSensor).subscribe(resp => {
        this.setData();
      });
    });
  }

  getData(d1, d2): void {
    this.sensorService.showFlowerpotSensorsMeasure(this.params.id, d1, d2).subscribe(data => {
      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChartLabels = [];
      this.data = data;
      this.sensors = data.sensors;
      for (const item of this.sensors) {
        if (item.sensor.type === 'DHT-11') {
          this.DHT = item;
          if (this.DHT.measure[0]) {
            for (const d of this.DHT.measure) {
              this.dataTemp.push(d.measurements.temperature);
            }
            for (const d of this.DHT.measure) {
              this.dataHum.push(d.measurements.humidity);
            }
            for (const d of this.DHT.measure) {
              this.dataDate.push(d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5));
            }
            const array = this.DHT.measure.slice().reverse();
            this.lastTemp = array[0].measurements.temperature;
            this.lastTime = array[0].created_at.slice(11, -5);
            this.lastHum = array[0].measurements.humidity;
            this.IDDHT = this.DHT.sensor.id;
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'HL-69') {
          this.HL69 = item;
          if (this.HL69.measure[0]) {
            for (const d of this.HL69.measure) {
              this.dataHumG.push(d.measurements.humidity);
            }
            for (const d of this.HL69.measure) {
              this.dataDate2.push(d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5));
            }
            const array = this.HL69.measure.slice().reverse();
            this.lastTime2 = array[0].created_at.slice(11, -5);
            this.lastHumG = array[0].measurements.humidity;
            this.IDHL = this.HL69.sensor.id;
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'ML85') {
          this.ML85 = item;
          if (this.ML85.measure[0]) {
            for (const d of this.ML85.measure) {
              this.dataUV.push(d.measurements.luzUV);
            }
            for (const d of this.ML85.measure) {
              this.dataDate3.push(d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5));
            }
            const array = this.ML85.measure.slice().reverse();
            this.lastluzUV = array[0].measurements.luzUV;
            this.lastTime3 = array[0].created_at.slice(11, -5);
            this.IDML = this.ML85.sensor.id;
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'WaterPump') {
          this.WatPump = item;
        }
      }
    });
  }

  updateData(): void {
    if (this.selectDate && this.selectDate2) {
      const d1 = formatDate(this.selectDate, 'yyyy-MM-dd', 'en');
      const d2 = formatDate(this.selectDate2, 'yyyy-MM-dd', 'en');
      this.getData(d1, d2);
    }
  }

  showDHT(): void {
    this.barChartData[0].data = this.dataTemp;
    this.barChartData[1].data = this.dataHum;
    this.barChartLabels = this.dataDate;
  }

  showML85(): void {
    this.barChartData[0].data = this.dataHumG;
    this.barChartLabels = this.dataDate2;
  }

  showHL69(): void {
    this.barChartData[0].data = this.dataUV;
    this.barChartLabels = this.dataDate3;
  }
}
