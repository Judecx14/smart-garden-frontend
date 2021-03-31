import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-flowerpot-details',
  templateUrl: './flowerpot-details.component.html',
  styleUrls: ['./flowerpot-details.component.css']
})
export class FlowerpotDetailsComponent implements OnInit {

  category = 'cactacea';
  type = 'desertica';
  irrigation = 'cada 2 semanas';

  constructor() {
  }

  ngOnInit(): void {
  }

}
