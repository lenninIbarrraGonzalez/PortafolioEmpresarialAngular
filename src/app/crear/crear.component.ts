import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
 lugar:any = {};
 id:any = null;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if(this.id != 'new'){
      this.lugaresService.getLugar(this.id)
      .subscribe((lugar)=>{
        this.lugar = lugar;
      });
    }
  }
  guardarLugar(){
    const direccion = `${this.lugar.calle}, ${this.lugar.ciudad}, ${this.lugar.pais}`;
    console.log(direccion);
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((resultado: any)=>{
      debugger;
      this.lugar.lat = resultado.features[0].center[1];
      this.lugar.lng = resultado.features[0].center[0];
      

      if(this.id != 'new'){
        this.lugaresService.editarLugar(this.lugar);
        alert('se edito con éxito');
      }
      else{
        this.lugar.id = Date.now().toString();
        this.lugaresService.guardarLugar(this.lugar);
        alert('se creo un nuevo negocio');
      }
      
      this.lugar = {};
    })
  }
}