import { Component, OnInit} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent implements OnInit{
    mapa:Mapboxgl.Map;
    ngOnInit(){
      Mapboxgl.accessToken = environment.mapboxKey;
      this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.2802004, 1.2182159], 
      zoom: 15
      });
  
  this.crearMarcador(-77.27792720000002, 1.2169178999999914);
}
    
  // lat:number = 1.2182159;
  // lng:number = -77.2802004;

  crearMarcador(lng: number, lat: number){
    const marker = new Mapboxgl.Marker({
      draggable: false
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }
  //find del mapa
    lugares = null;

    constructor(private lugaresService: LugaresService){
    lugaresService.getLugares().subscribe((lugares)=>{
      this.lugares = lugares;
    })
  }
}