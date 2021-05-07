import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SensorsService} from '../../../services/sensors/sensors.service';
import {Sensor} from '../../../classes/sensor';
import {FlowerpotSensor} from '../../../classes/flowerpot-sensor';
import {formatDate} from '@angular/common';
import {Chart, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Flowerpot} from '../../../classes/flowerpot';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import zoomPlugin from 'chartjs-plugin-zoom';

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

  public lineChartPlugins = [zoomPlugin];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {
          stepSize: 1
        }
      }], yAxes: [{}]
    },
    plugins: {
      zoom: {
        zoom: {
          enabled: true,
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        }
      },
      datalabels: {
        display: false
      }
    }

  };

  public barChartLabels: Label[] = this.dataDate;
  public barChartType: ChartType = 'line';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    {
      data: this.dataTemp,
      label: 'Temperatura',
      backgroundColor: '#31e15f',
      hoverBackgroundColor: '#31e15f',
      borderColor: '#31e15f',
      pointBackgroundColor: '#2B9606',
      pointHoverBorderColor: '#2B9606',
      fill: false
    },
    {
      data: this.dataHum,
      label: 'Humedad',
      backgroundColor: '#26bba7',
      hoverBackgroundColor: '#26bba7',
      borderColor: '#26bba7',
      fill: false
    }
  ];


  data;
  params: Params;
  sensor: Sensor = new Sensor();
  flowerpotSensor: FlowerpotSensor = new FlowerpotSensor();
  flowerpot: Flowerpot = {
    id: 0,
    name: '',
    spice: '',
    category: 0,
    garden: 0
  };
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
    this.getFlowerpot();
  }

  getFlowerpot(): void {
    this.sensorService.showFlowerpot(this.params.id).subscribe(data => {
      this.flowerpot = data;
    });
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
      console.log(this.data);
      this.sensors = data.sensors;
      for (const item of this.sensors) {
        if (item.sensor.type === 'DHT-11') {
          this.DHT = item;
          this.dataTemp = [];
          this.dataHum = [];
          this.dataDate = [];
          this.IDDHT = this.DHT.sensor.id;
          if (this.DHT.measure[0]) {
            for (const d of this.DHT.measure) {
              this.dataTemp.push(d.measurements.temperature);
            }
            for (const d of this.DHT.measure) {
              this.dataHum.push(d.measurements.humidity);
            }
            for (const d of this.DHT.measure) {
              this.dataDate.push((d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5)));
            }
            const array = this.DHT.measure.slice().reverse();
            this.lastTemp = array[0].measurements.temperature;
            this.lastTime = array[0].created_at.slice(11, -5);
            this.lastHum = array[0].measurements.humidity;
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'HL-69') {
          this.HL69 = item;
          this.dataHumG = [];
          this.dataDate2 = [];
          this.IDHL = this.HL69.sensor.id;
          if (this.HL69.measure[0]) {
            for (const d of this.HL69.measure) {
              this.dataHumG.push(d.measurements.grHumidity);
            }
            for (const d of this.HL69.measure) {
              this.dataDate2.push((d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5)));
            }
            const array = this.HL69.measure.slice().reverse();
            this.lastTime2 = array[0].created_at.slice(11, -5);
            this.lastHumG = array[0].measurements.grHumidity;
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'ML85') {
          this.ML85 = item;
          this.dataUV = [];
          this.dataDate3 = [];
          this.IDML = this.ML85.sensor.id;
          if (this.ML85.measure[0]) {
            for (const d of this.ML85.measure) {
              this.dataUV.push(d.measurements.uvIntensity);
            }
            for (const d of this.ML85.measure) {
              this.dataDate3.push((d.created_at.slice(0, -14) + ' ' + d.created_at.slice(11, -5)));
            }
            const array = this.ML85.measure.slice().reverse();
            this.lastluzUV = array[0].measurements.uvIntensity;
            this.lastTime3 = array[0].created_at.slice(11, -5);
          } else {
            console.log('sin datos coincidentes');
          }
        } else if (item.sensor.type === 'WaterPump') {
          this.WatPump = item;
        }
        this.showDHT();
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
    this.barChartData[1] = {
      data: this.dataHum,
      label: 'Humedad',
      backgroundColor: '#26bba7',
      hoverBackgroundColor: '#26bba7',
      fill: false
    };
    this.barChartData[0].data = this.dataTemp.slice().reverse().slice(0, 50);
    this.barChartData[0].label = 'Temperatura';
    this.barChartData[1].data = this.dataHum.slice().reverse().slice(0, 50);
    this.barChartData[1].label = 'Humedad';
    this.barChartLabels = this.dataDate.slice().reverse().slice(0, 50);
  }

  showML85(): void {
    if (this.barChartData.length > 1) {
      this.barChartData.pop();
    }
    this.barChartData[0].data = this.dataHumG.slice().reverse().slice(0, 150);
    this.barChartData[0].label = 'Humedad';
    this.barChartLabels = this.dataDate2.slice().reverse().slice(0, 150);
  }

  showHL69(): void {
    if (this.barChartData.length > 1) {
      this.barChartData.pop();
    }
    this.barChartData[0].data = this.dataUV.slice().reverse().slice(0, 150);
    this.barChartData[0].label = 'Indice UV';
    this.barChartLabels = this.dataDate3.slice().reverse().slice(0, 150);
  }

  updateFlowerpot(): void {
    this.flowerpot.id = this.params.id;
    this.sensorService.updateFlowerpot(this.flowerpot).subscribe(data => {
      this.flowerpot = data;
    });
  }
}
