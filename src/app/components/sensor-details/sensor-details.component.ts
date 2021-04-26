import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {SensorsService} from '../../services/sensors/sensors.service';
import {formatDate} from '@angular/common';
import {Flowerpot} from '../../classes/flowerpot';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {

  flowerpot: Flowerpot = new Flowerpot();
  name = 'sensorname';
  type = 'sensor';
  pins = '[1,2]';
  data;
  id: number;
  dataArray = [];
  measures: [];
  date = new Date();
  selectDate: string;
  if: number;

  constructor(public router: Router, private sensorService: SensorsService, private routerActive: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.data = {
      data: {
        name: '',
        type: '',
      },
      measure: []
    };
    this.flowerpot = {
      name: '',
      spice: '',
      category: 0,
      garden: 0
    };
    this.id = this.routerActive.snapshot.params.id;
    this.if = this.routerActive.snapshot.params.if;
    this.getFlowerpot();
    const d = new Date();
    const dte = d.setDate(d.getDate() + 1);
    const date2 = formatDate(dte, 'yyyy-MM-dd', 'en');
    const dt = d.setDate(d.getDate() - 31);
    const date = formatDate(dt, 'yyyy-MM-dd', 'en');
    this.getData(date, date2);
  }

  update(): void {
    this.setData();
  }

  table(): void {

  }

  setData(): void {
    const date2 = formatDate(this.selectDate, 'yyyy-MM-dd', 'en');
    const d = new Date(date2);
    d.setDate(d.getDate() - 31);
    const date = formatDate(d, 'yyyy-MM-dd', 'en');
    this.getData(date, date2);
  }

  getData(date, date2): void {
    this.sensorService.sensorMeasureByDate(this.id, date, date2).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.measures = data.measure.slice().reverse();
    });
  }

  getFlowerpot(): void {
    this.sensorService.showFlowerpot(this.if).subscribe(data => {
      this.flowerpot = data;
    });
  }
}
