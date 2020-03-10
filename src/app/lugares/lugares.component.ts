import { Component, OnInit} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations:[
    trigger('contenedorAnimable',[
      state('inicial', style({
        opacity: 0,
        // backgroundColor: 'green'
        // transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1,
        // backgroundColor: 'yellow'
        // transform: 'rotate(5,10,20,30deg)'
      })),
      transition('inicial => final', animate(4000)),
      // transition ('final => inicial', animate(5000))
    ])
  ]
})
export class LugaresComponent implements OnInit{
    state = 'inicial';
    mapbox = (Mapboxgl as typeof Mapboxgl);
    mapa:Mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lngOrg:number = -77.2802004;
    latOrg:number = 1.2182159;
    lng:number = 0;
    lat:number = 0;
    nombre:string = null;
    zoom:number = 13;
    lugares = null;
    suscriptor: Subscription[] = [];
    msgError: String;
    // faCoffee = faCoffee;
    // faStar = faStar;

  constructor(private lugaresService: LugaresService, library:FaIconLibrary){
    library.addIcons(fasStar, farStar);
    
    this.mapbox.accessToken = environment.mapboxKey;
    this.suscriptor.push(
      lugaresService.getLugares().subscribe((lugares)=>{
        
        //esto es para sockets        
        this.lugares = lugares;
        //esto es para realtime database
        // const result = lugares;
        // this.lugares = Object.values(result);
        
        this.buildMap();
        this.animar();
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
        console.log(this.state);
        this.state = (this.state === 'inicial') ? 'final' : 'inicial';
  }
}