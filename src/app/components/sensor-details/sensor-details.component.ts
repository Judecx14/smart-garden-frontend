import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {Router} from '@angular/router';

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
  dataArray = [
    {name: 1, fecha: 'fecha1'},
    {name: 2, fecha: 'fecha2'},
    {name: 3, fecha: 'fecha3'}
  ];

  constructor(public router: Router) {
  }

  ngOnInit(): void {

  }
}
