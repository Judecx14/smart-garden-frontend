import { Component, Input, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import "core-js/stable";
import "regenerator-runtime/runtime";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  @Input() plantId: string

  ws: any;
  chat: any;

  ngOnInit(): void {
    this.ws = Ws("ws://api-smart-garden.herokuapp.com", {
      path: "adonis-ws"
    });
    this.ws.connect();
    this.chat = this.ws.subscribe('measures');
    this.chat.on('message', (data:any)=>{
      console.log(data)
    })
  }

  order: string
  msg: any
  
  sendAction(action: string): void{
    this.order = '{ "order": '+'"'+action+'"'+', "plantID": '+this.plantId+' }'
    this.chat.emit('message', this.order);
  }

}
