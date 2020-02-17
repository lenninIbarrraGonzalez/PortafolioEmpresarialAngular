import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
 lugar:any = {};
  constructor(private lugaresService: LugaresService){
  }
  guardarLugar(){
    const direccion = `${this.lugar.calle}, ${this.lugar.ciudad}, ${this.lugar.pais}`;
    console.log(direccion);
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((resultado: any)=>{
      debugger;
      this.lugar.lat = resultado.features[0].center[1];
      this.lugar.lng = resultado.features[0].center[0];
      this.lugar.id = Date.now().toString();
      this.lugaresService.guardarLugar(this.lugar);
      alert('se creo un nuevo negocio');
      this.lugar = {};
    })
    
  }
}