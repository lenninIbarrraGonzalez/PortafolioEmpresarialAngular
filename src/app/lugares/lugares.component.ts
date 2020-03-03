import { Component, OnInit} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations:[
    trigger('contenedorAnimable',[
      state('inicial', style({
        opacity: 0.2,
        backgroundColor: 'green'
        // transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: 'yellow'
        // transform: 'rotate(5,10,20,30deg)'
      })),
      transition('inicial => final', animate(1000)),
      transition ('final => inicial', animate(500))
    ])
  ]
})
export class LugaresComponent implements OnInit{
    state = 'final';
    mapbox = (Mapboxgl as typeof Mapboxgl);
    mapa:Mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lngOrg:number = -77.2802004;
    latOrg:number = 1.2182159;
    lng:number = 0;
    lat:number = 0;
    nombre:string = null;
    zoom:number = 16;
    lugares = null;
    suscriptor: Subscription[] = [];
    msgError: String;
    
  constructor(private lugaresService: LugaresService){
    this.mapbox.accessToken = environment.mapboxKey;
    this.suscriptor.push(
      lugaresService.getLugares().subscribe((lugares)=>{
        
        //esto es para sockets        
        this.lugares = lugares;
        //esto es para realtime database
        // const result = lugares;
        // this.lugares = Object.values(result);
      
        this.buildMap();
      },
      (err)=>{
        console.log(err);
        this.msgError = err;
      }),
    );
  }
    
  buildMap(){
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox',
    style: this.style,
    center: [this.lngOrg, this.latOrg], 
    zoom: this.zoom
    });
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.lugares.forEach(lugar => {
      this.crearMarcador(lugar.lng, lugar.lat, lugar.nombre);
    });
    
  }

  crearMarcador(lng: number, lat: number, nombre:string){
    const marker = new Mapboxgl.Marker({
      draggable: true
      });
     // debugger;
      marker.setLngLat([lng, lat]);
      marker.addTo(this.mapa);

      marker.on('drag', ()=>{
       // console.log(marker.getLngLat);
      })
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.suscriptor.forEach(susc => {
      susc.unsubscribe();
    });
  }

  animar(){
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
}