import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  public radarChartLabels = ['01', '02', '03', '04'];
  public radarChartData = [
    {data: [10, 12, 13, 15], label: '2021'},
    {data: [12, 15, 12, 14], label: '2020'},
  ];
  public radarChartType = 'radar';

  constructor() {
  }

  ngOnInit(): void {
  }

}
