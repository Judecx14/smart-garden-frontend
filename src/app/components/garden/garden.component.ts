import {Component, OnInit} from '@angular/core';
import {SensorsService} from '../../services/sensors/sensors.service';
import {AuthService} from '../../services/auth/auth.service';
import {Garden} from '../../classes/garden';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css']
})
export class GardenComponent implements OnInit {
  id: number;
  gardens: Array<Garden>;
  newGarden: Garden = {
    name: '',
    location: '',
    user_id: 0,
  };

  constructor(private auth: AuthService, private sensorService: SensorsService) {
  }

  ngOnInit(): void {
    this.getUserID();
  }

  addGarden(): void {
    this.newGarden.user_id = this.id;
    this.sensorService.createGarden(this.newGarden).subscribe(() => {
      this.newGarden = new Garden();
      this.getGardens();
    });
  }

  getUserID(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.id = data.id;
      this.getGardens();
    });
  }

  getGardens(): void {
    this.sensorService.showGardenByUser(this.id).subscribe(garden => {
      this.gardens = garden;
      console.log(this.gardens);
    });
  }
}
