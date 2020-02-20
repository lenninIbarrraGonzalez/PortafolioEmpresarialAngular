import { Component, OnInit} from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent implements OnInit{
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
        this.lugares = lugares;
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
      debugger;
      marker.setLngLat([lng, lat]);
      marker.addTo(this.mapa);

      marker.on('drag', ()=>{
        console.log(marker.getLngLat);
      })
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.suscriptor.forEach(susc => {
      susc.unsubscribe();
    });
  }
}