import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {SensorsService} from '../../services/sensors/sensors.service';

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
    this.sensorService.showFlowerpotSensorsMeasure(this.flowerpotID).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
