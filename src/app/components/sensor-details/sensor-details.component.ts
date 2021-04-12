import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {SensorsService} from '../../services/sensors/sensors.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {

  flowerpot = 'Planta';
  name = 'sensorname';
  type = 'sensor';
  pins = '[1,2]';
  flowerpotID = 1;
  data;
  dataArray = [
    {name: 1, fecha: 'fecha1'},
    {name: 2, fecha: 'fecha2'},
    {name: 3, fecha: 'fecha3'}
  ];

  date = new Date();

  constructor(public router: Router, private sensorService: SensorsService) {
  }

  ngOnInit(): void {
  }

  printDate(): void {
    console.log(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
  }

  getData(): void {
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const year = new Date().getFullYear();
    const day = new Date().getDate() + 1;
    const month = new Date().getMonth() + 1;
    const date2 = year + '-' + month + '-' + day;
    this.sensorService.showFlowerpotSensorsMeasure(this.flowerpotID, date, date2).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
