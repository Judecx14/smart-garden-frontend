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
  measures: any;


  
  ngOnInit(): void {
    this.ws = Ws("ws://api-smart-garden.herokuapp.com", {
      path: "adonis-ws"
    });
    this.ws.connect();
    this.measures = this.ws.subscribe('measures');
    this.measures.on('message', (data:any)=>{
      console.log(data)
    })

  }


  order: string
  msg: any
  json: any
  water: boolean
  iluminite: boolean
  
  sendAction(action: string): void{
    if (action == "iluminar" || action == "apagar"){
      this.iluminite = !this.iluminite
      this.order = '{ "order": '+'"'+action+'"'+', "plantID": '+this.plantId+' }'
      this.json = JSON.parse(this.order)
      console.log(this.json)
      this.measures.emit('message', this.json);
    }
    if (action == "regar"){
      console.log("Hola soy primer water", this.water)
      this.water = !this.water
      console.log("Hola soy water despues de operacion", this.water)
      this.order = '{ "order": '+'"'+action+'"'+', "plantID": '+this.plantId+' }'
      this.json = JSON.parse(this.order)
      console.log(this.json)
      this.measures.emit('message', this.json);
      setTimeout(()=>{
        this.water = false
        console.log("Hola soy water despues de 15", this.water)
      }, 15000)  
    }
    
  }





}
