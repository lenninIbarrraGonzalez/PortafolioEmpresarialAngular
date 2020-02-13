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
    }

    
  
   
    
  // lat:number = 1.2182159;
  // lng:number = -77.2802004;
    lugares = null;

    constructor(private lugaresService: LugaresService){
    lugaresService.getLugares().subscribe((lugares)=>{
      this.lugares = lugares;
    })
  }

  
}