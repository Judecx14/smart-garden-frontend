import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = 'nombre';
  lastname = 'apellidos';
  mail = 'mail';

  constructor() {
  }

  ngOnInit(): void {
  }

}
