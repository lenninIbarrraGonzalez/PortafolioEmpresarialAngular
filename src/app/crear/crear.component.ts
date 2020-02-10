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
    this.lugar.id = Date.now().toString();
    this.lugaresService.guardarLugar(this.lugar);
    alert('se creo un nuevo negocio');
    this.lugar = {};
  }
}