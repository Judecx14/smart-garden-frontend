import {Component, OnInit} from '@angular/core';
import {Flowerpot} from '../../classes/flowerpot';
import {ActivatedRoute, Params} from '@angular/router';
import {SensorsService} from '../../services/sensors/sensors.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  id: Params;
  flowerpots: Array<Flowerpot>;
  flowerpot: Flowerpot = new Flowerpot();

  constructor(private router: ActivatedRoute, private sensorService: SensorsService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.router.snapshot.params;
    this.getFlowerpots();
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
}
