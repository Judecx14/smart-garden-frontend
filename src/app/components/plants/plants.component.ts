import {Component, OnInit} from '@angular/core';
import {Flowerpot} from '../../classes/flowerpot';
import {ActivatedRoute, Params} from '@angular/router';
import {SensorsService} from '../../services/sensors/sensors.service';
import {Garden} from '../../classes/garden';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  id: Params;
  flowerpots: Array<Flowerpot>;
  flowerpot: Flowerpot = new Flowerpot();
  garden: Garden = {
    user_id: 0,
    id: 0,
    name: '',
    location: ''
  };

  constructor(private router: ActivatedRoute, private sensorService: SensorsService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.router.snapshot.params;
    this.getFlowerpots();
    this.getGarden();
  }

  getGarden(): void {
    this.sensorService.showGarden(this.id.id).subscribe(data => {
      this.garden = data;
    });
  }

  getFlowerpots(): void {
    this.sensorService.showFlowerpotByGarden(this.id.id).subscribe(flowerpots => {
      this.flowerpots = flowerpots;
    });
  }

  addFlowerpot(): void {
    this.flowerpot.garden = this.id.id;
    console.log(this.flowerpot);
    this.sensorService.createFlowerpot(this.flowerpot).subscribe(() => {
      this.getFlowerpots();
    });
  }

  updateGarden(): void {
    this.garden.id = this.id.id;
    this.sensorService.updateGarden(this.garden).subscribe(data => {
      this.garden = data;
    });
  }
}
