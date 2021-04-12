import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TempTime} from '../../../interfaces/temp-time';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit, OnChanges {

  @Input() dataTemp: Array<TempTime> = [];
  @Input() dataHum: Array<any> = [];
  @Input() dataHL69: Array<any> = [];
  @Input() dataML85: Array<any> = [];
  @Input() dataWP: Array<any> = [];
  actualTemp: string;
  actualTempTime: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataTemp.currentValue !== changes.dataTemp.previousValue) {
      console.log(this.dataHum);
    }
  }
}
