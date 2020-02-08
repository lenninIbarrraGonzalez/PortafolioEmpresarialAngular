import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent {

  lat:number = 1.2182159;
  lng:number = -77.2802004;
  lugares = null;
  constructor(private lugaresService: LugaresService){
    this.lugares = lugaresService.getLugares();
  }
}