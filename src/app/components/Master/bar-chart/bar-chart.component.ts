import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit()
    :
    void {
  }

}
