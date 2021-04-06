import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SensorsService} from "../../../services/sensors/sensors.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data;

  sensorid = 3;
  public barChartData = [
    {data: [10, 11, 13, 15, 16, 17], label: 'series A'},
    {data: [22, 20, 21, 19, 18, 17], label: 'series B'},
  ];
  public barChartLabels = ['1', '2', '3', '4', '5', '6'];
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
      // this.sensorService.showSensorMeasure(this.sensorid).subscribe(data => {
      //   this.
      // })
    }
  }
}
